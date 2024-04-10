import express from "express";
import {event} from "./events/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import apiRouter from "./routes/apiRouter.js";
import catch404errors from "./middlewares/catch404errors.js";
import catchAllError from "./middlewares/catchAllError.js";

const app = express();
const httpServer = createServer(app);
const ws = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

event(ws)

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter)

app.use(catch404errors)
app.use(catchAllError)


export default httpServer;
