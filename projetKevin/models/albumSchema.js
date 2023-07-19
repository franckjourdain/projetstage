const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: { type: String },
    authorizedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    type: {
        type: String,
        enum: ["photo", "video", "fichier", "dossier"]
      },
      filePath: { type: String }
})

module.exports = mongoose.model("Album", albumSchema);
