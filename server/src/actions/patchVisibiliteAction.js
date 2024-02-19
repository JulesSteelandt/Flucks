import {existsSync, mkdirSync, rename} from "fs"
import {DOSSIER_PRIVE, DOSSIER_VIDEO} from "../conf/constant.js";

export function patchVisibiliteAction(req, res, next){
  try {
    if (!existsSync(DOSSIER_PRIVE)) {
      mkdirSync(DOSSIER_PRIVE, { recursive: true });
    }

    const PublicPath = `${DOSSIER_VIDEO}/${req.body.id}.mp4`
    const PrivatePath = `${DOSSIER_PRIVE}/${req.body.id}.mp4`

    if (req.body.public === 1){

      if (!existsSync(PublicPath)){
        if (existsSync(PrivatePath)){
          //Todo go bouger
        } else {
          //Todo il est pas dans le privée
        }
      } else {
        //Todo il est dans le public
      }


    } else if (req.body.public === 0){
      if (existsSync(PublicPath)){
        if (!existsSync(PrivatePath)){
          //Todo go bouger
        } else {
          //Todo il est deja dans le privée
        }
      } else {
        //Todo il est pas dans le public
      }

    }




  } catch (e) {
    console.error(e)
    next(500)
  }
}