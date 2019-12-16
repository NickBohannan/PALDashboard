const Sequelize = require('sequelize')

let db

db = new Sequelize('palportal', process.env.DATABASE_USER, process.env.DATABASE_PASS_08, {
	dialect: 'mssql'
})

const Login = db.define('logins', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customer_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber3: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber4: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_login: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Login