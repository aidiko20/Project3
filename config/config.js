require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQLPASS,
    database: "fixit_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "fixitdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "",
    password: null,
    database: "",
    host: "127.0.0.1",
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
