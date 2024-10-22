import cluster from "node:cluster";
import http from "node:http";
import os from "node:os";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const cpus = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpus - 1; i++) {
    cluster.fork({ PORT: PORT && PORT + i });
  }
} else {
  const WORKER_PORT = process.env.PORT;

  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid} on port ${WORKER_PORT}`);
  });

  server.listen(WORKER_PORT, () => {
    console.log(`Worker ${process.pid} running on port ${WORKER_PORT}`);
  });
}
