const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { getUsers,  deleteUserByID} = require('../controllers/user');

// validationResult: extracts the validation errors from a request and makes them available in a Result object.
const validateInput = ( req, res, next ) => { 
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

router.get('/users',[
],getUsers );

router.delete('/user',[
],deleteUserByID );

module.exports = router;
// check('email', 'Email is required').isEmail(),
// check('password', 'Password is required').not().isEmpty(),
// validateInput