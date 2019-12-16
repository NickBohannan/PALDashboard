const express = require("express")
const router = express.Router()
const Sequelize = require('sequelize')
const moment = require('moment')
const fs = require('fs')
const recursive = require('recursive-readdir')
const csv = require('csvtojson')
const _ = require('underscore')


const Mail = require('../models/mail')
const Order = require('../models/order')
const Bin = require('../models/bin')
const Workflow = require('../models/workflow')
const Login = require('../models/login')

const mailChecker = require('../mailchecker')



const Op = Sequelize.Op

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/mailchecker', async (req, res) => {
    try {
        // grabbing all mail boxes from today (needs to be today, current week and last week)  
        let preFilteredResults = await Mail.findAll({
            where: {
                sTime: {
                    [Op.gt]: moment().startOf('month').subtract(1, 'month').format('YYYY/MM/DD')
                }
            }
        })

        let currentTime = moment().startOf('day').format('YYYY/MM/DD')
        let weekTime = moment().startOf('week').format('YYYY/MM/DD')
        let monthTime = moment().startOf('month').format('YYYY/MM/DD')
        let lastWeekTime = moment().startOf('week').subtract(1, 'week').format('YYYY/MM/DD')
        let lastMonthTime = moment().startOf('month').subtract(1, 'month').format('YYYY/MM/DD')

        let todayArray =[]
        let weekArray = []
        let monthArray = []
        let lastWeekArray = []
        let lastMonthArray = []

        preFilteredResults.forEach((e) => {
            console.log(e.sTime)
            if (e.sTime > currentTime) {
                todayArray.push(e)
            }
            if (e.sTime < currentTime && e.sTime > weekTime) {
                weekArray.push(e)
            }
            if (e.sTime < weekTime && e.sTime > lastWeekTime) {
                lastWeekArray.push(e)
            }
            if (e.sTime < weekTime && e.sTime > monthTime) {
                monthArray.push(e)
            }
            if (e.sTime < monthTime && e.sTime > lastMonthTime) {
                lastMonthArray.push(e)
            }
        })

        console.log(currentTime)
        console.log(preFilteredResults.length)
        console.log(weekArray.length)
        console.log(monthArray.length)
        console.log(lastWeekArray.length)
        console.log(lastMonthArray.length)

        let todayCheck = mailChecker(todayArray)
        let weekCheck = mailChecker(weekArray)
        let monthCheck = mailChecker(monthArray)
        let lastWeekCheck = mailChecker(lastWeekArray)
        let lastMonthCheck = mailChecker(lastMonthArray)

        console.log(todayCheck)
        console.log(weekCheck)
        console.log(monthCheck)
        console.log(lastWeekCheck)
        console.log(lastMonthCheck)

        res.render('results', {
            todayCheck: todayCheck,
            weekCheck: weekCheck,
            monthCheck: monthCheck,
            lastWeekCheck: lastWeekCheck,
            lastMonthCheck: lastMonthCheck
        })

    } catch(err) {
        console.error(err)
    }
    
})

router.post('/', async (req, res) => {
    switch(req.body.dateoraccount) {
        case 'multiples':
            try {
                let preFilteredResults = await Mail.findAll({
                    where: {
                        sTime: {
                            [Op.startsWith]: moment().format('YYYY/MM/DD')
                        }
                    }
                })
                let accountArray = []
                for (let i = 0; i < preFilteredResults.length; i++) {
                    if (!accountArray.find((e) => { return e.Account == preFilteredResults[i].Account })) {
                        accountArray.push({
                            Account: preFilteredResults[i].Account,
                            Counter: 1
                        })
                    } else {
                        for (let k = 0; k < accountArray.length; k++) {
                            if (accountArray[k].Account == preFilteredResults[i].Account) {
                                accountArray[k].Counter = accountArray[k].Counter + 1
                                break
                            }
                        }
                    }
                }
                // let finalArray = accountArray.filter(obj => obj.Counter > 1)
                let finalArray = accountArray.filter(e => e.Counter > 1)
                res.send(finalArray)
            } catch(err) {
                console.error(err)
            }
            break;
        case 'account':
            try {
                let results = await Mail.findAll({
                    where: {
                        Account: req.body.accountnumber
                    },
                    order: [['sTime', 'DESC']]
                })
                res.render('results', {
                    results: results
                })
            } catch(err) {
                console.error(err)
            }
            break;
        case 'date':
            try {
                let results = await Mail.findAll({
                    where: {
                        sTime: {
                            [Op.gt]: req.body.startingdate,
                            [Op.lt]: req.body.endingdate
                        }
                    }
                })
                res.render('results', {
                    results: results
                })
            } catch(err) {
                console.error(err)
            }
            break;
        case 'both': 
            try {
                let results = await Mail.findAll({
                    where: {
                        sTime: {
                            [Op.gt]: req.body.startingdate,
                            [Op.lt]: req.body.endingdate
                        },
                        Account: req.body.accountnumber
                    }
                })
                res.render('results', {
                    results: results
                })
            } catch(err) {
                console.error(err)
            }
            break;
    }
})

router.get('/incoming', (req, res) => {
    res.render('incoming')
})

router.get('/backscan', (req, res) => {
    res.render('backscan')
})

router.post('/backscan', async (req, res) => {

    let missedBackscans = []
    let fileArray = []

    try {

        let fourMonthOrders = await Order.findAll({
            where: {
                actual_ship_date: {
                    [Op.gt]: req.body.date,
                    [Op.lt]: moment(req.body.date).add(1, 'd')
                },
                patient_name: {
                    [Op.notLike]: '%test%',
                    [Op.notLike]: '%Test%'
                },
                customer_code: {
                    [Op.not]: '1111111111'
                },
                hold_code: 0,
                cancel_who: ""
            }
        })

        let dateString = req.body.date
        let month = dateString.substring(5, 7)
        let workingDirectory = '//fp02/Docuware/PaperPort/2019/'

        recursive(workingDirectory, (err, files) => {
            files.forEach(e => {
                fileArray.push(e.substring(e.length-15, e.length-4))
            })
            for (let i=0;i<fourMonthOrders.length;i++) {
                if (!fileArray.includes(fourMonthOrders[i].order_no_ext)) {
                    missedBackscans.push(fourMonthOrders[i])
                }
            }
            console.log(`File Array Length: ${fileArray.length}`)
            console.log(`Number of Missed Backscans: ${missedBackscans.length}`)
            console.log(`Date Searched: ${req.body.date}`)
            res.render('missed_backscans', {
                missedBackscans: missedBackscans,
                dateString: dateString
            })
        })

    } catch (err) {
        console.error(err)
    }
}) 

router.get('/label', (req, res) => {
    res.render('label')
})

router.get('/bincreate', (req, res) => {
    res.render('bincreate')
})

router.post('/bincreate', async (req, res) => {

    try {

        let newOrderBin

        // if bin is found, remove tuple with that bin, make new tuple tied to order

        let orderBin = await Bin.findOne({
            where: {
                bin_number: req.body.bin
            }
        })

        if (orderBin == undefined) {
            newOrderBin = await Bin.create({
                order_no_ext: req.body.ordernum,
                bin_number: req.body.bin
            })
        } else {
            orderBin.destroy()
            newOrderBin = await Bin.create({
                order_no_ext: req.body.ordernum,
                bin_number: req.body.bin
            })
        }

        res.render('bincreate')

    } catch(err) {
        console.error(err)
    }

})

// ENTER BINSEARCH ROUTES HERE!!!!!

router.get('/binsearch', (req, res) => {
    res.render('binsearch')
})

router.post('/binsearch', async (req, res) => {

    try {

        let scan
        let order

        scan = await Bin.findOne({
            where: {
                order_no_ext: req.body.orderfield
            }
        })

        console.log(scan)

        if (scan == null) {
            res.render('nobin')
        }

        order = await Order.findOne({
            where: {
                order_no_ext: scan.order_no_ext
            }
        })

        let functionCode = await Workflow.findAll({
            limit: 1, 
            where: {
                order_no_ext: scan.order_no_ext
            },
            order: [['dtm', 'DESC']]
        })

        if (!functionCode[0]) {
            res.send('Sorry, location was not found or order has been shipped. Please press the back button on your browser.')
        } else {
            const jsonArray = await csv().fromFile('./function_codes.csv')
    
            let searchResult = jsonArray.find((e) => {
                return e.PK_FUNCTION_ID === functionCode[0].dataValues.function_code
            })
    
            res.render('searchresults', {
                scan: scan,
                searchResult: searchResult,
                order: order
            })
        }
    } catch(err) {
        console.error(err)
    }
})

router.get('/loginrecord', async (req, res) => {
    let logins = await Login.findAll()

    // create an array of number of logins per user in descending order
    let loginsByUser = _.groupBy(logins, 'customer_name')
    let loginsByDate = _.groupBy(logins, 'date_login')

    // send each pair of keys/properties as a cookie
    Object.keys(loginsByUser).forEach((key) => {
        res.cookie(key.toString(), loginsByUser[key].length, {
            expires: new Date(Date.now() + 1800000)
        })
    })

    let startDate = moment('2019-12-04')
    let currentDate = moment()

    let daysSinceStart = Math.ceil(moment.duration(currentDate - startDate).asDays())
    console.log(daysSinceStart)

    let data2 = []
    let labels2 = []

    // second graph: line graph of logins per day (12-04 first date)
    for (let i=0;i<daysSinceStart;i++) {

        // need to get dates in string form 'YYYY-MM-DD'
        let labelDate = startDate.format('YYYY-MM-DD').toString()
        labels2.push(labelDate)
        startDate = startDate.add(1, 'd')

    }

    console.log(logins[0])

    res.render('loginrecord')
})

module.exports = router