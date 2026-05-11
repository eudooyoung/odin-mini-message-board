import type types = require("../utils/types");
import db = require("../db/queries");
import validator = require("express-validator");
const { body, validationResult, matchedData } = validator;

const links = [
  { href: "/", text: "Message Board" },
  { href: "/new", text: "Send New Message" },
];

const messageBoardGet: types.Middleware = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", {
    title: "Mini Message Board",
    links: links,
    messages: messages,
  });
};

const newMessageGet: types.Middleware = (req, res) => {
  res.render("form", {
    title: "New Message",
    links: links,
  });
};

const messageDetailGet: types.Middleware = async (req, res) => {
  const messageId = Number(req.params.messageId);
  if (Number.isNaN(messageId)) {
    return;
  }
  const message = await db.getMessageById(messageId);
  res.render("detail", {
    title: "Message Detail",
    links: links,
    message: message,
  });
};

const alphaErr = "must only contain letters.";
const nameLengthErr = "must be between 1 and 10 characteres.";
const textLengthErr = "must be between 1 and 200 characters.";

const validateMessage = [
  body("author")
    .trim()
    .isAlpha()
    .withMessage(`Author ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Author ${nameLengthErr}`),
  body("text")
    .isLength({ min: 1, max: 200 })
    .withMessage(`Text ${textLengthErr}`),
];

const newMessagePostMiddleware: types.Middleware = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "New Message",
      links: links,
      errors: errors.array(),
      prev: req.body,
    });
  }
  const message = matchedData(req);
  const author = req.body.author;
  const text = req.body.text;
  await db.insertMessage({ username: author, text: text });
  res.redirect("/");
};

const newMessagePost = [...validateMessage, newMessagePostMiddleware];

export = { messageBoardGet, newMessageGet, messageDetailGet, newMessagePost };
