var express = require('express');
var router = express.Router();
const Departement = require('../model/departement');
const Division = require('../model/division');
const User = require("../model/User");
const { route } = require('./deparments');
router.get('/AllUsers', async (req, res) => {
  try {
    const Users = await User.find();


    if (!Users  || Users .length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
    }

    res.status(200).json(Users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/AllEmployes', async (req, res) => {
  try {
    const Users = await User.find({role:'employeur'});


    if (!Users  || Users .length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
    }

    res.status(200).json(Users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




router.get('/Admin', async (req, res) => {
  try {
    const Users = await User.find({role : 'admin'});


    if (!Users  || Users .length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
    }

    res.status(200).json(Users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/admin', async (req, res) => {
  try {
    const Users = await User.find({role : 'admin'});


    if (!Users  || Users .length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
    }

    res.status(200).json(Users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/employeur', async (req, res) => {
  try {
    const Users = await User.find({role : 'employeur'});


    if (!Users  || Users .length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
    }

    res.status(200).json(Users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/GetAdminById/:id', async function(req, res, next) {
  try {
      const adminId = req.params.id;
      // Assuming you have a User model defined and imported
      const admin = await User.findById({_id:adminId});

      if (admin) {
          res.status(200).json({ admin });
      } else {
          res.status(404).json({ message: 'Admin not found' });
      }
  } catch (error) {
      // Handle any errors that occur during processing
      next(error);
  }
});



router.put('/:email/updateState', async (req, res) => {
  try {
    const email = req.params.email;
    const newState = req.body.state;

    const user = await User.findOneAndUpdate({ email: email }, { $set: { state: newState } }, { new: true });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'user state changes', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.post('/checkUniqueEmail', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const emailExists = User.some(user => user.email === email);

  if (emailExists) {
    return res.status(409).json({ message: 'Email already exists' });
  } else {
    return res.status(200).json({ message: 'Email is unique' });
  }
});


router.post('/addEmployees', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, country, address, birthDate, description, skills, departement, permissions, isEmailVerified, state } = req.body;

    // Vérification si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Création d'un nouvel utilisateur avec le rôle admin
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      address,
      birthDate,
      description,
      skills,
      departement,
      permissions,
      isEmailVerified,
      state,
      role: 'employeur'
    });

    // Sauvegarde du nouvel utilisateur
    await newUser.save();

    res.status(201).json({ message: 'Admin ajouté avec succès', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/depEau', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const department = await Departement.findOne({ nom: 'Departement Eau' });

    if (!department) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found department: ${department._id}`);
    
    // Find users by department id
    const users = await User.find({ departement: department._id }).populate('departement');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});




router.get('/depVPRC', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const department = await Departement.findOne({ nom: 'Departement V&P et RC' });

    if (!department) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found department: ${department._id}`);
    
    // Find users by department id
    const users = await User.find({ departement: department._id }).populate('departement');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});



router.get('/depAF', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const department = await Departement.findOne({ nom: 'Departement Administratif et Financier' });

    if (!department) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found department: ${department._id}`);
    
    // Find users by department id
    const users = await User.find({ departement: department._id }).populate('departement');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});








router.get('/depTB', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const department = await Departement.findOne({ nom: 'Departement Terre et Biodiversité' });

    if (!department) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found department: ${department._id}`);
    
    // Find users by department id
    const users = await User.find({ departement: department._id }).populate('departement');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});










router.get('/depClimat', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const department = await Departement.findOne({ nom: 'Departement Climat' });

    if (!department) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found department: ${department._id}`);
    
    // Find users by department id
    const users = await User.find({ departement: department._id }).populate('departement');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});



router.get('/divDev', async (req, res) => {
  try {
    // Find the department by name
   // console.log(`Searching for department: ${depName}`);
    const div = await Division.findOne({ nom: 'Division Développement' });

    if (!div) {
      console.log('Department not found');
      return res.status(404).json({ message: 'Department not found' });
    }

    console.log(`Found division: ${div._id}`);
    
    // Find users by department id
    const users = await User.find({division: div._id }).populate('division');

    console.log(`Found users: ${users.length}`);
    res.json(users);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

router.get('/AllUsersNonAffecter', async (req, res) => {
  try {
    // Chercher les utilisateurs dont le département ou la division est null
    const Users = await User.find({
      $or: [
        { department: null },
        { division: null },
        {admin : !null}
      ]
    });

    if (!Users || Users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
    }

    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/AllDirecteurNonAffecter', async (req, res) => {
  try {
    // Chercher les utilisateurs dont le champ admin est null
    const Users = await User.find({
      admin: null
    });

    if (!Users || Users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
    }

    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




  module.exports = router;