require('dotenv').config(); // this is important!
module.exports = {
  "development": {
      "username": process.env.PG_USER,
      "password": process.env.PG_PASSWORD,
      "database": process.env.PG_DATABASE,
      "host"    : process.env.PG_HOST,
      "port"    : process.env.PG_PORT,
      "dialect" : "postgres",
      "dialectOptions": {
        "ssl": {
          "require": true, // This will help you. But you will see nwe error
          "rejectUnauthorized": false // This line will fix new error
        }
      },
  },
  "production": {
      "username": process.env.PG_USER,
      "password": process.env.PG_PASSWORD,
      "database": process.env.PG_DATABASE,
      "host"    : process.env.PG_HOST,
      "port"    : process.env.PG_PORT,
      "dialect" : "postgres",
      "dialectOptions": {
        "ssl": {
          "require": true, // This will help you. But you will see nwe error
          "rejectUnauthorized": false // This line will fix new error
        }
      },
  },
};