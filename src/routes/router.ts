import type e = require("express");
import express = require("express");
import controller = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.messageBoardGet);
router.get("/new", controller.newMessageGet);
router.get("/:messageId", controller.messageDetailGet);
router.post("/new", controller.newMessagePost);

export = router;
