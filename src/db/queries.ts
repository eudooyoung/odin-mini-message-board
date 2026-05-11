import type types = require("../utils/types");
import pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query("select * from messages;");
  return rows;
};

const getMessageById = async (messageId: number) => {
  const { rows } = await pool.query("select * from messages where id = $1;", [
    messageId,
  ]);
  return rows[0];
};

const insertMessage = async (message: types.MessageInput) => {
  await pool.query("insert into messages (username, text) values ($1, $2);", [
    message.username,
    message.text,
  ]);
};

export = { getAllMessages, getMessageById, insertMessage };
