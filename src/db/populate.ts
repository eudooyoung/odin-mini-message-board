#! /usr/bin/env node

import pg = require("pg");

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

const DB_URL =
  process.argv[2] === "local"
    ? process.env.LOCAL_DB_URL
    : process.env.PRODUCTION_DB_URL;

const main = async () => {
  console.log("seeding...");
  const client = new pg.Client({
    connectionString: DB_URL,
  });
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
