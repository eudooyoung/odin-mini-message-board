import pg = require("pg");

const DB_URL =
  process.argv[2] === "local"
    ? process.env.LOCAL_DB_URL
    : process.env.PRODUCTION_DB_URL;

const pool = new pg.Pool({ connectionString: DB_URL });

export = pool;