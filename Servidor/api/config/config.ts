require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  })

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "port":process.env.DB_PORT,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USER_TEST,
        "password": process.env.DB_PASSWORD_TEST,
        "database": process.env.DB_DATABASE_TEST,
        "port":process.env.DB_PORT_TEST,
        "host": process.env.DB_HOST_TEST,
        "dialect": "mysql",
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
