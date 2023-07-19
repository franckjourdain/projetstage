const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  albums: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album' 
  }]
});

// Hash le mot de passe avant l'enregistrement
// userSchema.pre('save', async function(next) {
//   const user = this;

//   if (!user.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   next();
// });

module.exports = mongoose.model("User", userSchema);
