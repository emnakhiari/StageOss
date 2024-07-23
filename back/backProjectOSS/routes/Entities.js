var express = require('express');
const division = require('../model/division');
const entities = require('../model/entities');
var router = express.Router();

/* GET home page. */
router.get('/AllEntities', async function(req, res, next) {
    try {
        const div = await entities.find();
    
    
        if (!div || div.length === 0) {
          return res.status(404).json({ message: 'Aucun utilisateur  trouvé' });
        }
    
        res.status(200).json(div);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
      }
});

module.exports = router;
