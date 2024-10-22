"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIdPattern = exports.validateNewUser = void 0;
const pattern = /([0-9a-zA-Z-]{36})$/;
const pattern2 = /^[0-9a-fA-F-]{36}$/;
const validateNewUser = (user) => {
    const requiredKeys = ["username", "age", "hobbies"];
    for (const key of requiredKeys) {
        if (user[key] === undefined || user[key] === null) {
            return false;
        }
    }
    return true;
};
exports.validateNewUser = validateNewUser;
const checkUserIdPattern = (id) => {
    return pattern2.test(id);
};
exports.checkUserIdPattern = checkUserIdPattern;
