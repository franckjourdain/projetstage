const express = require('express');
const jwt = require('jsonwebtoken');
const UserRouter = require('../router/User');
require('dotenv').config();

const server = express();

server.use(UserRouter);

// Middleware pour vérifier chaque demande avant d'envoyer une réponse
const authenticateToken = async (req, res, next) => {
  try {
    // Récupère le token dans le header Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    // Vérifie le token en utilisant la clé secrète définie dans les variables d'environnement
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // Recherche l'utilisateur associé au token
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    // Si l'utilisateur n'existe pas, lève une erreur
    if (!user) {
      throw new Error();
    }
    // Stocke l'utilisateur et le token dans la requête pour une utilisation ultérieure
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Vous devez être authentifié pour accéder à cette ressource' });
  }
};

server.use(authenticateToken);

module.exports = server;
