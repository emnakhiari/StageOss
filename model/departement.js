const mongoose = require('mongoose');
const Activité = require('./Activité'); // Ensure this is defined correctly

const departementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },

  activites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activité' // Reference to Activité model
  }],
  nbEmployees: {
    type: Number,
    required: true,
  },
 
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to User model
  }],
  AdminName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
   
  }
});

module.exports = mongoose.model('Departement', departementSchema);
