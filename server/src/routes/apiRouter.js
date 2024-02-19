import express from "express"
import {helloWorldAction} from '../actions/helloWorldAction.js';
import {uploadVideoAction} from '../actions/uploadVideoAction.js';
import {patchVisibiliteAction} from "../actions/patchVisibiliteAction.js";

const router = express.Router()

router
.route("/")
  .get((req, res, next) => helloWorldAction(req, res, next))
  .all((req, res, next) => next(405))

router
.route("/upload")
    .post((req, res, next) => uploadVideoAction(req, res, next))
    .all((req, res, next) => next(405))

router
    .route("/video/visibilite")
    .patch((req, res, next) => patchVisibiliteAction(req, res, next))

export default router