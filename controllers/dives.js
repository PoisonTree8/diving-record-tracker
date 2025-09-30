
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



router.get('/', async (req, res) => {
  try {
const currentUser = await User.findById(req.session.user._id);
res.locals.user = currentUser;              
res.locals.dives = currentUser ? currentUser.dives : [];
res.render('dives/index.ejs');
} catch (error) {
console.log(error);
res.redirect('/');
}
});


router.get('/new', (req,res) => {
    res.render('dives/new.ejs');
});

router.get('/:diveId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    const dive = currentUser.dives.id(req.params.diveId);
    if (!dive) {
      console.log('dive not found');
      return res.redirect('/dives');
    }
    res.locals.user = currentUser;
    res.locals.dive = dive;
    return res.render('dives/show.ejs');
  } catch (error) {
    console.log(error);
    return res.redirect('/dives');
  }
});

router.post('/', async (req,res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.dives.push(req.body);
    await currentUser.save();
    res.redirect('/dives');
}   catch (error) {
    console.log(error);
    res.redirect('/dives');
}
});


router.get('/:diveId/edit', async (req, res) => {
 try {
    const currentUser = await User.findById(req.session.user._id);
    const dive = currentUser.dives.id(req.params.diveId);
    if (!dive) {
      console.log('dive not found');
      return res.redirect('/dives');
    }
    res.locals.dive = dive;
    res.render('dives/edit.ejs');
  } catch (error) {
    console.log(error);
  }
});

router.put('/:diveId', async (req, res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    const dive = currentUser.dives.id(req.params.diveId);
    if (!dive) {
      console.log('dive not found');
      return res.redirect('/dives');
    } 
    dive.location   = req.body.location;
    dive.date       = req.body.date;
    dive.type       = req.body.type;
    dive.depth      = req.body.depth;
    dive.bottomTime = req.body.bottomTime;
    dive.notes      = req.body.notes;
    dive.rating     = req.body.rating;
    await currentUser.save();
    res.redirect('/dives');
  } catch (error) {
    console.log(error);
    res.redirect('/dives');
  }
});


module.exports = router;
