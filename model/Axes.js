const mongoose = require('mongoose');
const Activité = require('./Activité'); // Ensure this is defined correctly

const axesSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  activites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activité' // Reference to Activité model
  }],


});

module.exports = mongoose.model('Axes', axesSchema);
