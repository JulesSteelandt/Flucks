import express from "express"
import {helloWorldAction} from '../actions/helloWorldAction.js';

const router = express.Router()

router
.route("/")
  .get((req, res, next) => helloWorldAction(req, res, next))
  .all((req, res, next) => next(405))

export default router