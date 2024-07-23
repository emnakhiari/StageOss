var express = require('express');
var router = express.Router();
var Departement = require('../model/departement')
const User = require("../model/User");


/* GET home page. */
router.get('/AllDepartment', async function(req, res, next) {
  try {
    const departments = await Departement.find()

    if (!departments || departments.length === 0) {
      return res.status(404).json({ message: 'Aucun département trouvé' });
    }

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }

});


router.get('/DepartmentByName/:name', async function(req, res, next) {
  try {
    const name = req.params.name;
    const departments = await Departement.find({ nom: name });

    if (!departments || departments.length === 0) {
      return res.status(404).json({ message: 'Aucun département trouvé' });
    }

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



router.get('/DepartmentById/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const department = await Departement.findById(id);

    if (!department) {
      return res.status(404).json({ message: 'Aucun département trouvé' });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});






// Route to add a new department
router.post('/addDepartement', async (req, res) => {
  try {
    const { nom, activites, nbEmployees,employees,AdminName } = req.body;

    // Create a new department
    const newDepartement = new Departement({
      nom,
      activites,
      nbEmployees,
      employees ,// Will be updated later if employeeIds are provided
      AdminName
    });

    // Save the department to get its ID
    await newDepartement.save();

    // If employeeIds are provided, update the users and the department
    if (AdminName && AdminName.length > 0) {
      await User.updateMany(
        { _id: { $in: AdminName } },
        { $set: { departement: newDepartement._id } }
      );
      newDepartement.employees = AdminName;
      await newDepartement.save();
    }

    res.status(201).json({ message: 'Department added successfully', departement: newDepartement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/updateDep/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, activites, nbEmployees, employees, AdminName } = req.body;

    // Find the department by ID
    const departement = await Departement.findById(id);
    if (!departement) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Update the department fields
    departement.nom = nom || departement.nom;
   // departement.activites = activites || departement.activites;
    departement.nbEmployees = nbEmployees || departement.nbEmployees;
    departement.AdminName = AdminName || departement.AdminName;

    // Save the updated department to get its ID
    await departement.save();

    // If AdminName is provided, update the users and the department
    if (AdminName && AdminName.length > 0) {
      await User.updateMany(
        { _id: { $in: AdminName } },
        { $set: { departement: departement._id } }
      );
      departement.employees = AdminName;
      await departement.save();
    }

    res.status(200).json({ message: 'Department updated successfully', departement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
