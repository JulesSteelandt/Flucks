import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import wssHandle from "./wssHandle/index.js";
import apiRouter from "./routes/apiRouter.js";
import catch404errors from "./middlewares/catch404errors.js";
import catchAllError from "./middlewares/catchAllError.js";

const app = express();
const httpServer = createServer(app);
const wss = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello depuis la racine"))
app.use("/api", apiRouter)

app.use(catch404errors)
app.use(catchAllError)

wssHandle(wss)


export default httpServer;