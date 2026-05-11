#! /usr/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
create table if not exists messages (
    id integer primary key generated always as identity,
    username varchar ( 255 ),
    text text,
    added timestamptz default now()
);

insert into messages (username, text)
values ('Amando', 'Hi there!'), ('Charles', 'Hello World!');
`;

const main = async () => {
  console.log("seeding...");
  let client: pg.Client;
  if (process.argv[2] === "local") {
    console.log("connecting local db...");
    client = new pg.Client({
      connectionString: process.env.LOCAL_DB_URL,
    });
  } else {
    console.log("connecting remote db...");
    client = new pg.Client({
      user: process.env.REMOTE_DB_USER,
      password: process.env.REMOTE_DB_PW,
      host: process.env.REMOTE_DB_HOST,
      port: Number(process.env.REMOTE_DB_PORT),
      database: process.env.REMOTE_DB_NAME,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
      },
    });
  }
  try {
    await client.connect();
    console.log("connected...");
    await client.query(SQL);
    console.log("table populated...");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

main();
