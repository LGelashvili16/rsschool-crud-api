import { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../db";
import { v4 as uuidv4 } from "uuid";
import { checkUserIdPattern, validateNewUser } from "../utils";

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  try {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Failed to get users data!" }));
  }
};

export const getUser = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = req.url?.split("/")[3];

    const user = users.find((user) => user.id === userId);

    if (user) {
      res.end(JSON.stringify(user));
    } else if (userId && !checkUserIdPattern(userId)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Invalid user id!" }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "User not found!" }));
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Failed to get user data!" }));
  }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      newUser.id = uuidv4();

      if (!validateNewUser(newUser)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Required field is missing!" }));
      } else {
        users.push(newUser);
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
      }
    });
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Failed to create a new user!" }));
  }
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const updateUserId = req.url?.split("/")[3];

  const userIndex = users.findIndex((user) => user.id === updateUserId);

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    if (updateUserId && !checkUserIdPattern(updateUserId)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Invalid user id!" }));
    } else if (userIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "User does not exist!" }));
    } else if (!validateNewUser(JSON.parse(body))) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Required field is missing!" }));
    } else {
      users[userIndex] = { ...users[userIndex], ...JSON.parse(body) };

      res.end(JSON.stringify(users[userIndex]));
    }
  });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  const userIndex = users.findIndex((user) => user.id === userId);
  console.log(userIndex);

  console.log(userId && !checkUserIdPattern(userId));

  if (userId && !checkUserIdPattern(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid user id!" }));
  } else if (userIndex === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "User not found!" }));
  } else {
    users.splice(userIndex, 1);

    res.statusCode = 204;
    res.end(JSON.stringify(users));
  }
};
