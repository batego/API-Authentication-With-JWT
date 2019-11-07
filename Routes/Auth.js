const router = require('express').Router();
const User = require('../Model/User');
const Joi = require('@hapi/joi');


const schema = {
    name: Joi.string().required().min(6),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
};

router.post('/register', async (req, res) => {    
   
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;