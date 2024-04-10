import { createWriteStream } from "fs";
import {DOSSIER_TEMPORAIRE} from "../conf/constant.js"

export default (event, user, file) => {
    if (user.role === "streamer") {
        if (!file.tempFile) {
            console.log("Stream started");
            file.tempFile = createWriteStream(`${DOSSIER_TEMPORAIRE}/${file.name}.tmp`);
        }
        file.tempFile.write(event.video);
    }
};