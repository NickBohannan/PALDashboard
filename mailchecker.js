const moment = require('moment')

function mailChecker(arr) {
    
    let accountArray = []
    let total = 0
    
    for (let i = 0; i < arr.length; i++) {
        
        // looping through all mail boxes for a period of time, if the account number is new, add a new element to the array. If the account number is already in the array, add to the element's counter
        if (!accountArray.find((e) => { return e.Account == arr[i].Account })) {
            accountArray.push({
                Account: arr[i].Account,
                Counter: 1
            })
        } else {
            for (let k = 0; k < accountArray.length; k++) {
                if (accountArray[k].Account == arr[i].Account) {
                    accountArray[k].Counter = accountArray[k].Counter + 1
                    break
                }
            }
        }
    }

    // filter out all accounts that only have one box
    let finalArray = accountArray.filter(e => e.Counter > 1)

    // now that all single box accounts are removed, we can tick down all # of boxes for each account, which gives us the number of EXCESS boxes - stress on EXCESS!
    finalArray.forEach(e => e.Counter--)

    // sort array of accounts by most to least # of boxes
    finalArray.sort((a,b) => { return b.Counter - a.Counter })

    // count total number of excess boxes
    finalArray.forEach((e) => {
        if (e.Account.includes('0')) {
            total += e.Counter
        }
    })

    // render results
    return { finalArray, total }
    
}

module.exports = mailChecker