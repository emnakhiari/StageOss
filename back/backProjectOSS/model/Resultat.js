const mongoose = require('mongoose');
const Activité = require('./Activité'); // Ensure this is defined correctly

const ResultatSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  activites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activité' // Reference to Activité model
  }],
  
  division : {
    type: String,
   
  },
  Responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement", // Change to the name of the model as a string
  },
 
});

module.exports = mongoose.model('resultat', ResultatSchema);