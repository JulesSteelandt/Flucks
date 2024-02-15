import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/video',
  filename: function (req, file, cb) {
    cb(null, req.body.nom);
  }
});

const upload = multer({ storage: storage });

export function uploadVideoAction(req, res, next) {
  try {
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors du téléversement du fichier.' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite.' });
      }

      console.log('Fichier téléversé avec succès:', req.file);

      return res.status(200).json({ message: 'Fichier téléversé avec succès.' });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Une erreur s\'est produite.' });
  }
}
