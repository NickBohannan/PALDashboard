const Sequelize = require('sequelize')

let db 

db = new Sequelize('PALOrder', process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: 'SQL04',
    dialect: 'mssql'
})

const Mail = db.define('MailOpen', {
    sTime: {
        type: Sequelize.STRING(17),
        allowNull: true
    },
    sScan: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    iCast: {
        type: Sequelize.INTEGER(),
        allowNull: true
    },
    iBiofoam: {
        type: Sequelize.INTEGER(),
        allowNull: true
    },
    iRepair: {
        type: Sequelize.INTEGER(),
        allowNull: true
    },
    Account: {
        type: Sequelize.STRING(10),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Mail