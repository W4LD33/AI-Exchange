const postgres = require('postgres');
require('dotenv').config();

const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: process.env.USERNAME,
//     host: process.env.HOST,
//     port: process.env.DBPORT,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD
// })


const pool = new Pool({
    user:'postgres',
    host:'localhost',
    port:5432,
    database:'forum',
    password:'password'
})
  
module.exports = pool;