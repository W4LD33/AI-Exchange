const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/', usersController.getUsersByIds);

module.exports = router;
