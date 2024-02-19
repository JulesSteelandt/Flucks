import {existsSync, mkdirSync, rename} from "fs"
import {DOSSIER_PRIVE, DOSSIER_VIDEO} from "../conf/constant.js";
import { default as axios } from 'axios';

export async function patchVisibiliteAction(req, res, next) {
        if (!existsSync(DOSSIER_PRIVE)) {
            mkdirSync(DOSSIER_PRIVE, {recursive: true});
        }

        const PublicPath = `${DOSSIER_VIDEO}/${req.body.id}.mp4`
        const PrivatePath = `${DOSSIER_PRIVE}/${req.body.id}.mp4`

        if(!req.headers.authorization){
            return res.status(400).json({message: 'Pas de credentials envoyés'});
        } else {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const response = await axios.get(`http://docketu.iutnc.univ-lorraine.fr:35305/users/video/${req.body.id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            } catch (e) {
                return res.status(400).json({message: e.response.data.message});
            }


            if (req.body.public === 1) {

                if (!existsSync(PublicPath)) {
                    if (existsSync(PrivatePath)) {
                        rename(PrivatePath, PublicPath, (err) => {
                            if (err) throw err
                            console.log(`${req.body.id} est devenu publique`)
                            return res.status(200).json({message: 'La vidéo est devenu publique'});
                        })
                    } else {
                        return res.status(400).json({message: 'La vidéo n\'existe pas dans le répertoire privé'});
                    }
                } else {
                    return res.status(400).json({message: 'La vidéo est déjà publique'});
                }


            } else if (req.body.public === 0) {
                if (existsSync(PublicPath)) {
                    if (!existsSync(PrivatePath)) {
                        rename(PublicPath, PrivatePath, (err) => {
                            if (err) throw err
                            console.log(`${req.body.id} est devenu privé`)
                            return res.status(200).json({message: 'La vidéo est devenu privée'});

                        })
                    } else {
                        return res.status(400).json({message: 'La vidéo n\'existe pas dans le répertoire publique'});
                    }
                } else {
                    return res.status(400).json({message: 'La vidéo est déjà privée'});
                }

            }
        }
}