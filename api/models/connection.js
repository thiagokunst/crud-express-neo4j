const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "admin")
);
const session = driver.session();

module.exports = {
    session
}