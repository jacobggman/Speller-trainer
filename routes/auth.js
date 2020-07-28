const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../model/User.js');
const validation = require('../validation');

router.post('/register', async (req, res) => {
    const error = validation.registerValidation(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const hash = await bcryptjs.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/login', async (req, res) => {
    const error = validation.loginValidation(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) { return res.status(404).send('Email not found'); };

    const validPass = await bcryptjs.compare(req.body.password, user.password);

    if (!validPass) { return res.status(404).send('Invalid password') };

    res.send('Success');
})

module.exports = router;