const router = require('express').Router();
const User = require('../Model/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const schema = {
    name: Joi.string().required().min(6),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
};

router.post('/register', async (req, res) => {    
   
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveUser = await user.save();
        res.send({user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login',async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is Wrong');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password invalid');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged In');
});

module.exports = router;