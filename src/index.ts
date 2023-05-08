import express, { Application, NextFunction, Request, Response } from "express";
import { myDataSource } from "./database/db.config";
import dotenv from "dotenv";
import http from "http";
import { instrument } from "@socket.io/admin-ui";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import bodyParser from "body-parser";
import { validateToken } from "./middlewares/validateToken.middleware";
import { Server, Socket } from "socket.io";
import requestRouter from "./routes/friendRequest.routes";
const port = process.env.PORT ? process.env.PORT : 4500;
import { getSocketInstance } from "./socket/socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const app: Application = express();
app.use(cors());

export let io: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;
myDataSource
  .initialize()
  .then(() => {
    const server = http.createServer(app);
    getSocketInstance(server);

    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    throw err;
  });

dotenv.config();

app.use(bodyParser.json());
app.use("/auth", authRouter);

app.use(validateToken);

app.use("/request", requestRouter);

app.use("*", (Request, Response) => {
  Response.json("Incorect request route");
});

app.use((err: Error, req: Request, res: Response) => {
  return res.status(503).json(err.message);
});
