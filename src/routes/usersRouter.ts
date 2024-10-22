import { IncomingMessage, ServerResponse } from "node:http";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";

export const usersRouter = (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (
      req.method === "GET" &&
      (req.url === "/api/users" || req.url === "/api/users/")
    ) {
      getUsers(req, res);
    } else if (
      req.method === "GET" &&
      req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)
    ) {
      getUser(req, res);
    } else if (
      req.method === "POST" &&
      (req.url === "/api/users" || req.url === "/api/users/")
    ) {
      createUser(req, res);
    } else if (
      req.method == "PUT" &&
      req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)
    ) {
      updateUser(req, res);
    } else if (
      req.method == "DELETE" &&
      req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)
    ) {
      deleteUser(req, res);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Invalid route or method!" }));
    }
  } catch (error) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Invalid route or method!!!" }));
  }
};
