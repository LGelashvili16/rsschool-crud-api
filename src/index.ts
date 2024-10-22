import http from "node:http";
import dotenv from "dotenv";
import { usersRouter } from "./routes/usersRouter";
import { jsonMiddleware } from "./middleware/jsonMiddleware";

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  try {
    jsonMiddleware(req, res, () => {
      usersRouter(req, res);
    });
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Something went wrong on the server!" }));
  }
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
