import express from "express"
import catch404errors from "./middlewares/catch404errors.js";
import catchAllError from "./middlewares/catchAllError.js";
import apiRouter from "./routes/apiRouter.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => res.send("Hello depuis la racine"))
app.use("/api", apiRouter)

app.use(catch404errors)
app.use(catchAllError)

export default app;