const Sequelize = require('sequelize')

let db 

db = new Sequelize('palportal', process.env.DATABASE_USER, process.env.DATABASE_PASS_08, {
    host: 'SQL08',
    dialect: 'mssql'
})

const Workflow = db.define('Work_flow', {
    chan: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    employee_id: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    order_no_ext: {
        type: Sequelize.STRING(15),
        allowNull: true
    },
    dtm: {
        type: Sequelize.DATE,
        allowNull: true
    },
    function_code: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    elapse_time: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    next_function_id: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    next_function_dtm: {
        type: Sequelize.DATE,
        allowNull: true
    },
    exit_function_id: {
        type: Sequelize.STRING(20),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Workflow.removeAttribute('id')

module.exports = Workflow