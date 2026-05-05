import type e = require("express");

export type MiddleWare = {
  req: e.Request;
  res: e.Response;
};
