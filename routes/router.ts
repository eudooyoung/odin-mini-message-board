import type e = require("express");
const { Router } = require("express");
const express = require("express");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
const links = [
  { href: "/", text: "Message Board" },
  { href: "/new", text: "Send New Message" },
];
const router = Router();

router.get("/", (req: e.Request, res: e.Response) => {
  res.render("index", {
    banner: "Mini Message Board",
    links: links,
    heading: "Messages",
    messages: messages,
  });
});

router.get("/new", (req: e.Request, res: e.Response) => {
  res.render("form", {
    banner: "Mini Message Board",
    links: links,
    heading: "Send New Messages",
  });
});

router.get("/:messageId", (req: e.Request, res: e.Response) => {
  const messageId = Number(req.params.messageId);
  res.render("detail", {
    banner: "Mini Message Board",
    links: links,
    heading: "Message Detail",
    message: messages[messageId],
  });
});

router.post("/new", (req: e.Request, res: e.Response) => {
  const author = req.body.author;
  const message = req.body.message;
  messages.push({
    text: message,
    user: author,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = router;
