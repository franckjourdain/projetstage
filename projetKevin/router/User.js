const express = require('express');
const router = new express.Router();
const User = require('../models/userSchema');
const Album = require('../models/albumSchema');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

//////////////////////////////////////////////////////////////////////multer création de dossiers //////////////////////////////////////////////////////////////////////////////
// Configuration de Multer pour le téléchargement de fichiers


const storage = multer.diskStorage({
  limits: {
    fileSize: 5000000, // 5Mo
  },
  destination: function (req, file, cb) {
    // Chemin du dossier principal de destination
    const destinationFolder = './uploads/';

    // Création du dossier principal de destination (récursivement si nécessaire)
    fs.mkdir(destinationFolder, { recursive: true }, (err) => {
      if (err) {
        console.error('Erreur lors de la création du dossier', err);
        return cb(err); // Renvoyer l'erreur au client ou à Multer
      }

      cb(null, destinationFolder);
    });
  },
  filename: function (req, file, cb) {
    // Obtenir l'extension du fichier d'origine
    const fileExtension = path.extname(file.originalname);

    // Obtention du sous-dossier parent en fonction du type de fichier
    let parentFolder;
    if (file.fieldname === 'photo') {
      parentFolder = 'photo';
    } else if (file.fieldname === 'video') {
      parentFolder = 'video';
    } else {
      parentFolder = 'fichier';
    }

    // Nom du fichier
    const filename = `${parentFolder}-${file.originalname}-${fileExtension}`;

    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  // Vérification de l'extension du fichier
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];

  const fileExtension = path.extname(file.originalname);
  if (allowedExtensions.includes(fileExtension.toLowerCase())) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Extension de fichier non autorisée')); // Rejeter le fichier
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Appliquer le filtre de fichiers
});



// Fonction pour générer le token d'accès
function generateAccessToken(user) {
  const { firstname, lastname, email, _id } = user;
  const userPayload = { firstname, lastname, email, _id };
  return jwt.sign(userPayload, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

// Middleware pour vérifier le token d'authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('Erreur lors de la vérification du token', err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}


//////////////////////////////////////////////////////////////////////////////inscription////////////////////////////////////////////////////////
// Inscription
router.post('/inscription', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send({ message: 'Email existe déjà !' });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
      email: req.body.email,
    });

    const savedUser = await newUser.save();

    // Récupérer l'ID de l'utilisateur
    const userId = savedUser._id;

    // Créer le dossier utilisateur
    const userFolder = path.join('uploads', `${userId}`);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    // Créer les sous-dossiers "photo", "video" et "fichier"
    const subfolders = ['photo', 'video', 'fichier'];
    subfolders.forEach((subfolder) => {
      const subfolderPath = path.join(userFolder, subfolder);
      if (!fs.existsSync(subfolderPath)) {
        fs.mkdirSync(subfolderPath);
      }
    });

    res.status(200).send({ message: 'Inscription réussie' });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur", error);
    res.status(500).send({ message: "Erreur lors de l'inscription de l'utilisateur" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////connection//////////////////////////////////////////////////////////
// Login
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé.' });
      }

      const isValidPass = bcryptjs.compareSync(req.body.password, user.password);
      if (!isValidPass) {
        return res.status(401).send({ message: 'Mot de passe incorrect.' });
      }

      const token = generateAccessToken(user);
      res.status(200).send({ message: 'Login réussi', token: token });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
});
///////////////////////////////////////////////////////////////////////enregistrement photo //////////////////////////////////////////////////////
// Mes Photos
router.post('/mesphotos', authenticateToken, upload.array('img', 10), async (req, res) => {
  try {
    if (req.files) {
      const userId = req.user._id;
      const userPhotoFolder = path.join(__dirname, '..', 'uploads', userId.toString(), 'photo');

      if (!fs.existsSync(userPhotoFolder)) {
        fs.mkdirSync(userPhotoFolder, { recursive: true });
      }

      const altText = req.body.alt_text;
      const albums = [];

      for (const file of req.files) {
        const newFileName = `${altText}${path.extname(file.originalname)}`;
        const filePath = path.join(userPhotoFolder, newFileName);

        fs.renameSync(file.path, filePath);

        // Créez un nouvel album avec le chemin du fichier
        const newAlbum = new Album({
          owner: userId,
          name: altText,
          authorizedUsers: [userId],
          type: 'photo',
          filePath: `/uploads/${userId.toString()}/photo/${newFileName}`
        });

        await newAlbum.save();
        albums.push(newAlbum);
      }

      res.status(200).send({ albums });
    } else {
      res.status(400).send({ message: 'Aucun fichier n\'a été téléchargé' });
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement des photos', error);
    res.status(500).send({ message: 'Erreur lors du téléchargement des photos' });
  }
});

/////////////////////////////////////////////////////////////////////////////////////enregistrement de dossiers ///////////////////////////////////////////////
// Route pour créer un nouveau dossier dans le répertoire photo de l'utilisateur
router.post('/mesphotos/createfolder', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const userPhotoFolder = path.join(__dirname, '..', 'uploads', userId.toString(), 'photo');

    const newFolderName = req.body.folderName;
    const newFolderPath = path.join(userPhotoFolder, newFolderName);

    if (fs.existsSync(newFolderPath)) {
      return res.status(400).send({ message: 'Le dossier existe déjà' });
    }

    fs.mkdir(newFolderPath, async (err) => {
      if (err) {
        console.error('Erreur lors de la création du dossier', err);
        return res.status(500).send({ message: 'Erreur lors de la création du dossier' });
      }

      // Créer un nouvel album avec le chemin du dossier
      const newAlbum = new Album({
        owner: userId, // Utilisez simplement l'ID de l'utilisateur, pas un tableau
        name: newFolderName,
        authorizedUsers: [userId],
        type: 'dossier',
        filePath: `/uploads/${userId.toString()}/photo/${newFolderName}`
      });

      await newAlbum.save();

      res.status(200).send({ message: 'Dossier créé avec succès', album: newAlbum });
    });
  } catch (error) {
    console.error('Erreur lors de la création du dossier', error);
    res.status(500).send({ message: 'Erreur lors de la création du dossier' });
  }
});
/////////////////////////////////////////////////////liste photo/////////////////////////////////////////
// Mes Photos
router.get('/mesphotos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const albums = await Album.find({ owner: userId });

    console.log(albums); // Vérification dans la console

    res.status(200).send({ albums });
  } catch (error) {
    console.error('Erreur lors de la récupération des photos', error);
    res.status(500).send({ message: 'Erreur lors de la récupération des photos' });
  }
});


///////////////////////////////////////////////////////////////////////////////////suppression//////////////////////////////////
// suppression de la photo
router.delete('/mesphotos/:photoId', authenticateToken, async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const userId = req.user._id;

    // Recherche de la photo dans la base de données
    const photo = await photo.findOne({ _id: photoId, owner: userId });

    if (!photo) {
      return res.status(404).send({ message: 'Photo non trouvée' });
    }

    const filePath = photo.filePath;

    // Suppression du fichier de la photo
    fs.unlinkSync(filePath);

    // Suppression de l'entrée de la photo dans la base de données
    await photo.remove();

    res.status(200).send({ message: 'Photo supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la photo', error);
    res.status(500).send({ message: 'Erreur lors de la suppression de la photo' });
  }
});


///////////////////////////////////////////////////////////////////////////////////afficher les dossiers créé//////////////////////////////////////


module.exports = router;
