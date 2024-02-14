import {existsSync, mkdirSync, unlinkSync} from "fs";
import {DOSSIER_TEMPORAIRE, DOSSIER_VIDEO} from "../conf/constant.js";
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export default (socket, user, file) => {
    if (user.action === "live") {
        socket.emit("disconnect-with", socket.client.conn.id);
    }
    if (user.role === "streamer") {
        console.log("Fin de stream");
        file.tempFile.end();
        if (!existsSync(DOSSIER_VIDEO)) {
            mkdirSync(DOSSIER_VIDEO, {recursive: true});
        }

        let pathFileTemp = `${DOSSIER_TEMPORAIRE}/${file.name}.tmp`;
        let pathFileTranscode = `${DOSSIER_VIDEO}/${file.name}.mp4`;

        console.log("Conversion...");

        ffmpeg()
            .input(pathFileTemp)
            .withVideoCodec("libx264")
            .addOption("-preset", "ultrafast")
            .addOption("-crf", 22)
            .output(pathFileTranscode)
            .on("end", () => {

                console.log("Conversion fini");

                unlinkSync(pathFileTemp); // Delete file temp
            })
            .run();
    }
};