import type e = require("express");

export type Middleware = (req: e.Request, res: e.Response) => void;

export type MessageInput = { username: string; text: string };
