'use strict'
const Pool = require('pg').Pool

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'OIDC',
    password: '',
    port: 5432,
})

module.exports = db
