const { Pool } = require("pg");

const pool = new Pool({
  user: "uyzffbhm",
  password: process.env.DB_PASSWORD,
  database: "uyzffbhm",
  port: "5432",
  host: process.env.DB_HOST,
  ssl: false,
});

export default pool;
