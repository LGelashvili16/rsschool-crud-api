"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getUsers = (req, res) => {
    try {
        res.writeHead(200);
        res.end(JSON.stringify(db_1.users));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Failed to get users data!" }));
    }
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    try {
        const userId = req.url?.split("/")[3];
        const user = db_1.users.find((user) => user.id === userId);
        if (user) {
            res.end(JSON.stringify(user));
        }
        else if (userId && !(0, utils_1.checkUserIdPattern)(userId)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Invalid user id!" }));
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User not found!" }));
        }
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Failed to get user data!" }));
    }
};
exports.getUser = getUser;
const createUser = (req, res) => {
    try {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newUser = JSON.parse(body);
            newUser.id = (0, uuid_1.v4)();
            if (!(0, utils_1.validateNewUser)(newUser)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Required field is missing!" }));
            }
            else {
                db_1.users.push(newUser);
                res.statusCode = 201;
                res.end(JSON.stringify(newUser));
            }
        });
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Failed to create a new user!" }));
    }
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const updateUserId = req.url?.split("/")[3];
    const userIndex = db_1.users.findIndex((user) => user.id === updateUserId);
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        if (updateUserId && !(0, utils_1.checkUserIdPattern)(updateUserId)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Invalid user id!" }));
        }
        else if (userIndex === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User does not exist!" }));
        }
        else if (!(0, utils_1.validateNewUser)(JSON.parse(body))) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Required field is missing!" }));
        }
        else {
            db_1.users[userIndex] = { ...db_1.users[userIndex], ...JSON.parse(body) };
            res.end(JSON.stringify(db_1.users[userIndex]));
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userId = req.url?.split("/")[3];
    const userIndex = db_1.users.findIndex((user) => user.id === userId);
    console.log(userIndex);
    console.log(userId && !(0, utils_1.checkUserIdPattern)(userId));
    if (userId && !(0, utils_1.checkUserIdPattern)(userId)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid user id!" }));
    }
    else if (userIndex === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "User not found!" }));
    }
    else {
        db_1.users.splice(userIndex, 1);
        res.statusCode = 204;
        res.end(JSON.stringify(db_1.users));
    }
};
exports.deleteUser = deleteUser;
