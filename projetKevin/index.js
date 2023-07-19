const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const server = require('./middleware/server');
const userRouter = require('./router/User');

const app = express();
const port = process.env.PORT || 3002;

const url = 'mongodb://127.0.0.1:27017/unicornss';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Middleware global pour parser les données en JSON
app.use(express.json());

// Activer CORS
app.use(cors());

// Utiliser le middleware d'authentification pour toutes les routes
app.use(server);
app.use(userRouter);

// Définir le chemin absolu vers le dossier "uploads"
const uploadsPath = path.join(__dirname, 'uploads');

// Servir les fichiers statiques depuis le dossier "uploads"
app.use('/uploads', express.static(uploadsPath));

// Vos routes ici
app.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'Page d\'accueil' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'page d\'accueil' });
});

// Connexion à la base de données
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à la base de données');
    // Démarrer le serveur une fois connecté à la base de données
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((err) => console.error('Erreur de connexion à la base de données', err));
