const mongoose = require('mongoose');
const Departement = require('./departement');
const Resultat = require("./Resultat")

const activiteSchema = new mongoose.Schema({
  nom: {
    type: String,
    // Add required if necessary
  },
 
  indicateurs: {
    type: String,
    // Specify that indicateurs is an array of strings
  },

  UniteDeVerification: {
    type: String,
    // Add required if necessary
  },
  division : {
    type: String,
   
  },
  Cumul: {
    type: String,
    // Add required if necessary
  },
  ValeurDeBase: {
    type: String,
     // Add required if necessary
  },
 
  Progret: {
    type: String,
     // Add required if necessary
  },
  ValeurCible: {
    type: String,
   // Add required if necessary
  },
  Priorite: {
    type: String,
     // Add required if necessary
  },
  MoyenDeFabication: {
    type: String,
    // Add required if necessary
  },
  Responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement", // Change to the name of the model as a string
  },
  Resultat: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"resultat", // Add required if necessary
  },
  EvaluationChaqueAnnee: [{
    Annee: { type: Number, required: true},
    Duree: [{ type: String, required: true }],
    Cible: { type: String, required: true },
    Realisation: { type: String, required: true }
    // Add other fields as needed
  }],
  Commentaire: {
    type: String,
     // Add required if necessary
  },
});

module.exports = mongoose.model('Activite', activiteSchema);
