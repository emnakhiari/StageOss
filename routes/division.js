var express = require('express');
var router = express.Router();
const Division = require('../model/division');


/* GET home page. */
router.get('/AllDivision', async function(req, res, next) {
    try {
        const div = await Division.find();
    
    
        if (!div || div.length === 0) {
          return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
        }
    
        res.status(200).json(div);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
      }
});

router.post('/AddDivision', async (req, res, next) => {
  const { nom, activites, nbEmployees, employees, AdminName, Service } = req.body;

  if (!nom || !nbEmployees ) {
    return res.status(400).json({ message: 'Le nom, le nombre d\'employés sont obligatoires' });
  }

  try {
    const newDivision = new Division({
      nom,
      activites,
      nbEmployees,
      employees,
      AdminName,
      Service
    });

    const savedDivision = await newDivision.save();

    if (AdminName && AdminName.length > 0) {
      await User.updateMany(
        { _id: { $in: AdminName } },
        { $set: { division: savedDivision._id } }
      );
      savedDivision.employees = AdminName;
      await savedDivision.save();
    }

    res.status(201).json({ message: 'Department added successfully', division: savedDivision });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/updateDivision/:id', async (req, res, next) => {
  const { nom, activites, nbEmployees, employees, AdminName, Service } = req.body;

  if (!nom || !nbEmployees) {
    return res.status(400).json({ message: 'Le nom, le nombre d\'employés sont obligatoires' });
  }

  try {
    const division = await Division.findById(req.params.id);

    if (!division) {
      return res.status(404).json({ message: 'Division not found' });
    }

    division.nom = nom;
   
    division.nbEmployees = nbEmployees;
   
    division.AdminName = AdminName;
  
    const updatedDivision = await division.save();

    if (AdminName && AdminName.length > 0) {
      await User.updateMany(
        { _id: { $in: AdminName } },
        { $set: { division: updatedDivision._id } }
      );
      updatedDivision.employees = AdminName;
      await updatedDivision.save();
    }

    res.status(200).json({ message: 'Department updated successfully', division: updatedDivision });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Trouver une division par ID
router.get('/findDivisionById/:id', async (req, res, next) => {
  try {
    const division = await Division.findById(req.params.id)

    if (!division) {
      return res.status(404).json({ message: 'Division not found' });
    }

    res.status(200).json(division);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
