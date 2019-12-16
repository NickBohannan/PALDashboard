const Sequelize = require('sequelize')

let db 

db = new Sequelize('palportal', process.env.DATABASE_USER, process.env.DATABASE_PASS_08, {
    host: 'SQL08',
    dialect: 'mssql'
})

const Bin = db.define('bins', {
    order_no_ext: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    bin_number: {
        type: Sequelize.STRING(4),
        allowNull: false,
        defaultValue: '0000'
    }
}, {
    timestamps: true
})

module.exports = Bin