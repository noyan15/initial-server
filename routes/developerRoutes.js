const express = require('express');
const router = express.Router();

const {
    addDeveloper,
    getSpecificDeveloper,
    updateDeveloper,
    deleteDeveloper
} = require('../controllers/developerController');

router.post('/add-developer', addDeveloper);
router.get('/developer/:id', getSpecificDeveloper);
router.patch('/update-developer/:id', updateDeveloper);
router.delete('/delete-developer/:id', deleteDeveloper);


module.exports = router;