const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "RICK95",
  port: 5432,
  database: "proyecto_assets"
});

module.exports = pool;
