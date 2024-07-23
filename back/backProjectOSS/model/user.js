const mongoose = require('mongoose');
const Departement = require('./departement');
const division = require('./division');
const Axes = require('./Axes');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.isExternalUser;
    },
  },
  imageUrl: {
    type: String,
    default: "http://localhost:3000/images/user_3177440.png"
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
  },
  skills: {
    type: [String], 
  },
  isExternalUser: {
    type: Boolean,
  },
  departement: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: Departement, 
  },
  division: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: division, 
  },
  axes: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: Axes, 
  },
  admin: {
    numberEquipe: {
      type: String,
    },
    description: {
      type: String,
    },
    posteDate: {
      type: Date,
    },
  },
  superAdmin: {
    numberDepartement: {
      type: String,
    },
    description: {
      type: String,
    },
    posteDate: {
      type: Date,
    },
  },
  permissions: {
    type: [String], // Changed to array of strings for better clarity
  },
  isEmailVerified: {
    type: Boolean,
  },
  state: {
    type: String,
    enum: ['validated', 'not validated', 'blocked', 'archive'],
    default: 'not validated',
  },
  role: {
    type: String,
    enum: ['admin', 'lecteur', 'employeur', 'superAdmin'],
    required: [true, 'Please provide a user role'],
  },
  previousPasswords: [{
    type: String,
  }],
  isDeactivated: {
    type: Boolean,
    default: false,
  },
 axe: {
    type: String,
   
  },
  wasDeactivated: {
    type: Boolean,
    default: false,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lastFailedAttempt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
