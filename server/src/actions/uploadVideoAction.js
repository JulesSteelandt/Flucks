import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/video');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.params.id}.mp4`);
    }
    });

const upload = multer({ storage: storage })

export function uploadVideoAction(req, res, next) {
  try {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Erreur lors du téléversement:', err);
            return res.status(500).json({ error: 'Erreur lors du téléversement.' });
        }

      console.log('Fichier téléversé avec succès:', req.body.nom);

      return res.status(200).json({ message: 'Fichier téléversé avec succès.' });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Une erreur s\'est produite.' });
  }
}
