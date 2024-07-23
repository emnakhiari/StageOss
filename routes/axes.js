var express = require('express');
var router = express.Router();
var Activities = require('../model/Activité')
var Resultat = require('../model/Resultat');
var Axes = require('../model/Axes');


/* GET home page. */
router.get('/AllAxes', async function(req, res, next) {
  try {
      const div = await Axes.find();
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});
router.post('/AddAxes', async (req, res, next) => {
    const { nom, activites} = req.body;
  
    if (!nom  ) {
      return res.status(400).json({ message: 'Le nom est obligatoires' });
    }
  
    try {
      const newAxes = new Axes({
        nom,
        activites,
    
        
      });
  
      const savedAxes = await  newAxes.save();
  
     
  
      res.status(201).json({ message: 'Department added successfully',  axes: savedAxes });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/UpdateAxe/:id', async (req, res, next) => {
    const { nom, activites, nbEmployees, employees, AdminName, Service } = req.body;

    if (!nom ) {
        return res.status(400).json({ message: 'Le nom et le nombre d\'employés sont obligatoires' });
    }

    try {
        const division = await Axes.findById(req.params.id);

        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        // Update fields
        division.nom = nom;
      

        const updatedDivision = await division.save();

        res.status(200).json({ message: 'Department updated successfully', division: updatedDivision });
    } catch (err) {
        next(err);  // Use next to pass errors to the global error handler
    }
});

  
  router.get('/FindAxeById/:id', async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const axe = await Axes.findById(id);
  
      if (!axe) {
        return res.status(404).json({ message: 'Axe non trouvé' });
      }
  
      res.status(200).json({ axes: axe });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
    

module.exports = router;
