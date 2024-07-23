const mongoose = require('mongoose');
const Activité = require('./Activité'); // Ensure this is defined correctly

const EntitiesSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  activites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activité' // Reference to Activité model
  }],
  Service : {
    type:String,
    require:true
  }
});

module.exports = mongoose.model('Entities', EntitiesSchema);
