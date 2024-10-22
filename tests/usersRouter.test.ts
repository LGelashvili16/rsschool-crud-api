import { usersRouter } from "../src/routes/usersRouter";
import { IncomingMessage, ServerResponse } from "node:http";
import { UserInterface } from "../src/db";
import { users } from "../src/db";
import { Socket } from "node:net";

describe("GET /api/users", () => {
  it("GET /api/users returns an empty array when no users exist", () => {
    const mockUsers: UserInterface[] = [];

    const req = new IncomingMessage(new Socket()) as IncomingMessage;
    req.method = "GET";
    req.url = "/api/users";
    const res = new ServerResponse(req) as any;
    res.statusCode = null;
    res.end = jest.fn();

    usersRouter(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.end).toHaveBeenCalledWith(JSON.stringify(mockUsers));
  });
});

describe("POST /api/users", () => {
  it("A new object is created by a POST api/users request", () => {
    const mockUsers: UserInterface[] = [];

    const req = new IncomingMessage(new Socket()) as IncomingMessage;
    req.method = "POST";
    req.url = "/api/users";
    req.headers = {
      "Content-Type": "application/json",
    };
    let body = "";
    req.on("data", (chunk) => {
      body = JSON.parse(chunk.toString());
    });

    const res = new ServerResponse(req) as any;
    res.end = jest.fn();

    req.on("end", () => {
      res.statusCode = 201;
      res.end(JSON.stringify(body));
    });

    const newUser: UserInterface = {
      id: "new-user-id",
      username: "New User",
      age: 28,
      hobbies: ["new-hobby"],
    };
    req.emit("data", Buffer.from(JSON.stringify(newUser)));
    req.emit("end");

    usersRouter(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.end).toHaveBeenCalledWith(JSON.stringify(newUser));
  });
});

describe("GET /api/users/:userId", () => {
  beforeEach(() => {
    users.length = 0;
    users.push({
      id: "user1",
      username: "Existing User",
      age: 30,
      hobbies: ["existing-hobby"],
    });
  });

  it("Gets a created user by its ID", () => {
    const mockUsers: UserInterface[] = [
      {
        id: "user1",
        username: "Existing User",
        age: 30,
        hobbies: ["existing-hobby"],
      },
    ];

    const req = new IncomingMessage(new Socket()) as IncomingMessage;
    req.method = "GET";
    req.url = "/api/users/user1";
    const res = new ServerResponse(req) as any;
    res.statusCode = 200;
    res.end = jest.fn();

    usersRouter(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.end).toHaveBeenCalledWith(
      JSON.stringify(mockUsers.find((user) => user.id === "user1"))
    );
  });
});
