const express = require('express');
const consola = require("consola");
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }
})
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      consola.error('DATABASE: Connection failed');
      console.log(err);
  }
  if (res) {
      consola.success('DATABASE: Connection success');
    //   console.log(res);
  }
  pool.end() 
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    consola.success('SERVER: Listening to port', port, '...');
});