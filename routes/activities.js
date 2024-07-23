var express = require('express');
var router = express.Router();
var Activities = require('../model/Activité')
var Resultat = require('../model/Resultat');


/* GET home page. */
router.get('/AllActivities', async function(req, res, next) {
  try {
      const div = await Activities.find();
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/AllActivities/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
      const div = await Activities.findById(id);
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});


router.get('/GetResultatByActivities/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const activite = await Activities.findById(id);

    if (!activite) {
      return res.status(404).json({ message: 'Activité non trouvée' });
    }

    const resultats = await Resultat.find({ activites: id });

    if (resultats.length === 0) {
      return res.status(404).json({ message: 'Aucun résultat trouvé pour cette activité' });
    }

    res.status(200).json(resultats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



router.get('/AllActivitiesByIdDepartement/:id/AllActs', async function(req, res, next) {
  try {
     const id = req.params.id;
      const div = await Activities.find({Responsable : id});
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/AllActivitiesByIdDepartement/:id/GDT', async function(req, res, next) {
  try {
     const id = req.params.id;
      const div = await Activities.find({Responsable : id , division:'Gestion durable et Terre'});
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/AllActivitiesByIdDepartement/:id/DB', async function(req, res, next) {
  try {
     const id = req.params.id;
      const div = await Activities.find({Responsable : id , division:'Diversité Biologique'});
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/addActivity', async (req, res) => {
    try {
        const activity = new Activities(req.body);
        const savedActivity = await activity.save();
        
        res.status(201).json({ id: savedActivity._id }); // Retourne l'ID de l'activité ajoutée
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'activité:', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'activité' });
    }
});




module.exports = router;
