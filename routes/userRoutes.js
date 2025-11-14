const express = require('express');
const router = express.Router();

const {
    registration,
    login,
    changePassword
} = require('../controllers/userController');

router.post('/register', registration);
router.post('/login', login);
router.post('/change-password', changePassword);



module.exports = router;