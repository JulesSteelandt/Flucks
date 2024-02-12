import express from "express"
import catch404errors from "./middlewares/catch404errors.js";
import catchAllError from "./middlewares/catchAllError.js";
import apiRouter from "./routes/apiRouter.js";
import {WebSocketServer} from "ws";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const wss = new WebSocketServer({port: 3000})

app.use(express.static('public'))

app.get("/", (req, res) => res.send("Hello depuis la racine"))
app.use("/api", apiRouter)

app.use(catch404errors)
app.use(catchAllError)

import wssHandle from "./wssHandle/index.js";
wssHandle(wss)


export default app;