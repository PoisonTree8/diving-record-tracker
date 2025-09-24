
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
  res.render('dives/index.ejs');
});

router.get('/new', (req,res) => {
    res.render('dives/new.ejs');
});

router.post('/', async (req,res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect('/');
}   catch (error) {
    console.log(error);
    res.redirect('/');
}
});





module.exports = router;
