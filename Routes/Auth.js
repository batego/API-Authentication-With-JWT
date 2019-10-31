const router = require('express').Router();
const User = require('../Model/User');

const Joi = require('@hapi/joi');
const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
};

router.post('/register', async (req, res) => {

    const validation = Joi.validate(req.boby, schema);
    res.send(validation);
    // res.send('Register');
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    // try {
    //     const saveUser = await user.save();
    //     res.send(saveUser);
    // } catch (error) {
    //     res.status(400).send(error);
    // }
});

module.exports = router;