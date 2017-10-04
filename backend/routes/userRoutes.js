const express = require('express');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
var User = schema.User;
var Lesson = schema.Lesson;
var Slide = schema.Slide;

//find specific user
router.get('/user/:userId', function(req, res) {
  User.find({_id: req.params.userId})
  .then(function(users) {
    res.send(users);
  })
  .catch(function(err) {
    res.send(err);
  })
})

//find all users
router.get('/user', function(req, res) {
  User.find({})
  .then(function(users) {
    res.send(users);
  })
  .catch(function(err) {
    res.send(err);
  })
})

router.put('/user', function(req, res) {
  // console.log('kenny look here', req)
  

  let update = {}
  if (req.body.data.avatarURL) update.avatarURL = `${req.body.data.avatarURL}`
  if (req.body.data.fullName) update.fullName = `${req.body.data.fullName}` 
  if (req.body.data.location) update.location = `${req.body.data.location}` 
  if (req.body.data.website) update.website = `${req.body.data.website}` 
  if (req.body.data.githubURL) update.githubURL = `${req.body.data.githubURL}` 
  if (req.body.data.emailPublic) update.emailPublic = `${req.body.data.emailPublic}` 
  if (req.body.data.emailLikeGoal) update.emailLikeGoal = `${req.body.data.emailLikeGoal}` 

  let options = {new:true}
  console.log('hey',req.body.data.userId)
  User.findOneAndUpdate({_id:req.body.data.userId}, update, options, function(err, user) {
    if (err) res.send(err);
    else {
      res.send(user);
    }

    // if (req.body.username) user.username = req.body.username;
    // if (req.body.lessons) user.lessons = req.body.lessons;
    // if (req.body.favorites) user.favorites = req.body.favorites;

    // User.save(function (err) {
    //   if (err) {
    //     throw err;
    //     return;
    //   };
    //   res.send('user updated')
    // });
  })
});

router.delete('/user/:lessonId', function(req, res) {
  User.findByIdAndRemove(req.params.userId, function(err, user) {
    if (err) {
      throw err;
      return;
    };

    res.send(user._id + 'removed');
  });
});

module.exports = router;
