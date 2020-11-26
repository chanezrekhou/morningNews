var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");


/* SIGN UP. */
router.post('/sign-up', async function (req, res, next) {
  var checkUser = await userModel.findOne({ email: req.body.emailFromFront });
  const regex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if (regex.test(req.body.emailFromFront) == false) {
    res.json({ error: "Merci d'entrer une addresse email valide, petit coquin" });
  }
  if (req.body.usernameFromFront.length == 0 || req.body.emailFromFront.length == 0 || req.body.passwordFromFront.length == 0) {
    res.json({ error: "Tous les champs ne sont pas renseignés" });
  } else {
    if (!checkUser) {
      var salt = uid2(32);
      var newUser = new userModel({
        username: req.body.usernameFromFront,
        email: req.body.emailFromFront,
        salt: salt,
        password: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
        token : uid2(32),
      })
      var saved = await newUser.save();
      res.json({ saved: true, token : saved.token });
    } else {
      res.json({ error: "Cet utilisateur existe déjà" });
    }
  }
});

/* SIGN IN. */
router.post('/sign-in', async function (req, res, next) {
  var user = await userModel.findOne({ email: req.body.emailFromFront })
  var hash = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);
  if (hash === user.password) {
    res.json({ exist: true, token : user.token });
  } else {
    res.json({ error: "Mot de passe invalide" });
  }
});

/* LOG OUT */
router.get('/logout', async function (req, res, next) {
  var status = null;
  res.json({status});
})

module.exports = router;
