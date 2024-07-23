var express = require('express');
var router = express.Router();
var Activities = require('../model/Activité')
var Resultat = require('../model/Resultat')
var Activities = require('../model/Activité')


/* GET home page. */
router.get('/AllResultat', async function(req, res, next) {
  try {
      const div = await Resultat.find();
  
  
      if (!div || div.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
      }
  
      res.status(200).json(div);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/AllResultatByDeparement/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const activities = await Activities.find({ Responsable: id });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'Aucune activité trouvée' });
    }

    const activityIds = activities.map(activity => activity._id);
    const resultat = await Resultat.find({ activites: { $in: activityIds } });

    if (!resultat || resultat.length === 0) {
      return res.status(404).json({ message: 'Aucun résultat trouvé' });
    }

    res.status(200).json(resultat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/AllResultatByDeparement/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const activities = await Activities.find({ Responsable: id });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'Aucune activité trouvée' });
    }

    const activityIds = activities.map(activity => activity._id);
    const resultat = await Resultat.find({Responsable: id });

    if (!resultat || resultat.length === 0) {
      return res.status(404).json({ message: 'Aucun résultat trouvé' });
    }

    res.status(200).json(resultat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



router.get('/AllResultatByDeparement/:id/:role', async function(req, res, next) {
  try {
    const id = req.params.id;
    const role=req.params.role
    const activities = await Activities.find({ Responsable: id  });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'Aucune activité trouvée' });
    }

    const activityIds = activities.map(activity => activity._id);
    const resultat = await Resultat.find({ activites: { $in: activityIds } , division:role });

    if (!resultat || resultat.length === 0) {
      return res.status(404).json({ message: 'Aucun résultat trouvé' });
    }

    res.status(200).json(resultat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




















router.get('/GetActivitiesByResultat/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const resultat = await Resultat.findById(id);

    if (!resultat) {
      return res.status(404).json({ message: 'Résultat non trouvé' });
    }

    const activities = await Activities.find({ _id: { $in: resultat.activites } });

    if (activities.length === 0) {
      return res.status(404).json({ message: 'Aucune activité trouvée pour ce résultat' });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




router.post('/addResultat', async (req, res) => {
  try {
      const newResultat = new Resultat(req.body);
      const savedResultat = await newResultat.save();
      res.status(201).json({ id: savedResultat._id }); // Ensure you return the ID of the created document
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du résultat' });
  }
});



router.put('/updateResultat/:id', async function(req, res, next) {
  try {
      const resultatId = req.params.id;
      const updatedData = {
          nom: req.body.nom,
          activites: req.body.activites // Assurez-vous que c'est un tableau d'ObjectId
      };

      const updatedResultat = await Resultat.findByIdAndUpdate(
          resultatId,
          updatedData,
          { new: true } // Cette option renvoie le document mis à jour
      );

      if (!updatedResultat) {
          return res.status(404).json({ message: 'Résultat non trouvé' });
      }

      res.status(200).json(updatedResultat);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.put('/updateResultatAct/:id', async function(req, res, next) {
  try {
      const resultatId = req.params.id;
      const activityId = req.body.activityId; // Assurez-vous que l'ID de l'activité est dans le corps de la requête

      // Récupérer l'objet actuel
      const currentResultat = await Resultat.findById(resultatId);
      if (!currentResultat) {
          return res.status(404).json({ message: 'Résultat non trouvé' });
      }

      // Ajouter le nouvel activityId au tableau activites
      currentResultat.activites.push(activityId);

      // Enregistrer les modifications
      const updatedResultat = await currentResultat.save();

      res.status(200).json(updatedResultat);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});


  router.get('/GetDivisionByResultat/:id', async function(req, res, next) {
    try {
      const id = req.params.id;
      const resultat = await Resultat.findById(id, 'division'); // Fetch only the division field
      
      if (!resultat) {
        return res.status(404).json({ message: 'Résultat non trouvé' });
      }
      
      res.status(200).json({ division: resultat.division });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  
module.exports = router;