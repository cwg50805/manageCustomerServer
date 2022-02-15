const { Router } = require('express');
const router = Router();
const { getUsers, deleteUserByID } = require('../controllers/user');


router.get('/users', [
], getUsers);

router.delete('/users', [
], deleteUserByID);

module.exports = router;