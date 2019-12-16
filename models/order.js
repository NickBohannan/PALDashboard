const Sequelize = require('sequelize')

let db

db = new Sequelize('palportal', process.env.DATABASE_USER, process.env.DATABASE_PASS_08, {
    host: 'sql08',
	dialect: 'mssql'
})

const Order = db.define('orders', {
    order_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ext: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    location: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    patient_code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ord_type: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    order_no_ext: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    status: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    hold_code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hold_reason: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    inbound_prepaid: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    inbound_airborne: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    po: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    po_number: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    order_no_charge: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    order_no_charge_reason: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    received_payment: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    received_payment_type: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    discount_percent: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    discount_reason: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    return_shoes: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    return_shoes_no_charge: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    return_casts: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    return_casts_no_charge: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    entry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    entry_who: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    reentry_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    reentry_who: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    sched_ship_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    actual_ship_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    ship_who: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    cancel_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cancel_who: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    posted_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    posted: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    internal_delivery_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    no_charge_for_rush: {
        type: Sequelize.CHAR(1)
    },
    attention: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    terms: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    special_instr: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    finance_charge_type: {
        type: Sequelize.INTEGER(2),
        allowNull: false
    },
    finance_charge_percent: {
        type: Sequelize.INTEGER(2),
        allowNull: false
    },
    tax_id: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    tax_percent: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    total_tax: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    outbound_shipping_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    product_retail_price: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    options_retail_price: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    total_invoice: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    shipping_method: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    ship_to_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    ship_to_addr1: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    ship_to_addr2: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    ship_to_addr3: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    ship_to_city: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    ship_to_state: {
        type: Sequelize.STRING(4),
        allowNull: false
    },
    ship_to_zip: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    ship_to_country: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    sales_territory: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    primary_item_code: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    customer_code: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    customer_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    customer_lastname: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    patient_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    product_code: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    product_qty: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    cod: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    special_handling: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    completed_notshipped: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    no_charge_outbound_shipping: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    product_type: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    inbound_shipping_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    return_shoes_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    return_cast_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    rush_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    product_discount: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    options_discount: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    labor: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    inbound_shipping_discount: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    outbound_shipping_discount: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    total_taxable: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    options_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    product_cost: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    currency_id: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    exchange_rate: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    received_payment_amount: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: false
    },
    received_payment_doc_no: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    received_payment_exp_month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    received_payment_exp_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entry_finish_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    entry_finish_who: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    reentry_finish_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    reentry_finish_who: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    workorder_type: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    tracking_number: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Spare: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    misc_charge: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: true
    },
    RAW_FILE_PATH: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    Evaluated: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	},
	PicturePath: {
		type: Sequelize.STRING(256),
		allowNull: true
	},
	Form_Type: {
		type: Sequelize.STRING(25),
		allowNull: true
	},
    PrcLevel: {
        type: Sequelize.STRING(25),
        allowNull: true
    },
	Item_Price: {
		type: Sequelize.DECIMAL(9, 5),
		allowNull: true
	},
	Check_Name_Match: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	EvaluatedDTM: {
		type: Sequelize.DATE,
		allowNull: true
	},
	EvaluatedWho: {
		type: Sequelize.STRING(25),
		allowNull: true
	},
    SC_OUT_OF_AREA: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: true
    },
    SC_OUT_RESIDENCE: {
        type: Sequelize.DECIMAL(19, 5),
        allowNull: true
    },
    ElectronicOrder: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
	MachineName: {
		type: Sequelize.STRING(100),
		allowNull: true
	}
}, {
	timestamps: false
})

module.exports = Order