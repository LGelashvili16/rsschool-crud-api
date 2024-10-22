"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const usersController_1 = require("../controllers/usersController");
const usersRouter = (req, res) => {
    try {
        if (req.method === "GET" &&
            (req.url === "/api/users" || req.url === "/api/users/")) {
            (0, usersController_1.getUsers)(req, res);
        }
        else if (req.method === "GET" &&
            req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)) {
            (0, usersController_1.getUser)(req, res);
        }
        else if (req.method === "POST" &&
            (req.url === "/api/users" || req.url === "/api/users/")) {
            (0, usersController_1.createUser)(req, res);
        }
        else if (req.method == "PUT" &&
            req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)) {
            (0, usersController_1.updateUser)(req, res);
        }
        else if (req.method == "DELETE" &&
            req.url?.match(/\/api\/users\/([0-9a-zA-Z-]+)$/)) {
            (0, usersController_1.deleteUser)(req, res);
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Invalid route or method!" }));
        }
    }
    catch (error) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Invalid route or method!!!" }));
    }
};
exports.usersRouter = usersRouter;
