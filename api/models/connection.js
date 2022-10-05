const neo4j = require("neo4j-driver");
require('dotenv').config()

let url = "bolt://" + process.env.DB_URL;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;

const driver = neo4j.driver(
    url,
    neo4j.auth.basic(user, password)
);


module.exports = {
    driver
}