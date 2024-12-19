const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.post('/signup', userController.registar); // Use 'registar' instead of 'signup'
router.post('/login', userController.login);
router.put('/edit/:id_user', userController.editUser); // Update user
router.delete('/delete/:id_user', userController.deleteUser); // Delete user


module.exports = router;
