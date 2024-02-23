import {existsSync, mkdirSync} from "fs";
import {DOSSIER_TEMPORAIRE} from "../conf/constant.js";

export default (event, user, file) => {
    console.log("Initialisation de l'utilisateur");

    user.role = event.role;
    if (user.role === "streamer") {
        console.log("Streamer connecté");

        file.temp = null
        file.name = event.id

        if (!existsSync(DOSSIER_TEMPORAIRE)) {
            mkdirSync(DOSSIER_TEMPORAIRE, { recursive: true });
        }

    } else if (user.role === "viewer") {
        console.log("Viewer connecté");
    }
};