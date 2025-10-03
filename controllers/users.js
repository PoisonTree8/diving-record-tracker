const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
const allUser = await User.find({});
res.render('users/index.ejs', {users: allUsers });            
} catch (error) {
console.log(error);
res.redirect('/');
}
});

router.get('/:userId', async (req, res) => {
  try {
    const userProfile = await User.findById(req.params.userId);
    if (!userProfile) {
      return res.redirect('/users');
    }
    res.render('users/show.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/users');
  }
});

module.exports = router