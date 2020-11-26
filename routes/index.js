var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var userModel = require('../models/users');

/* GET WISHLIST */
router.post('/wishlist', async function (req, res, next) {
  var findUser = await userModel.findOne({ token: req.body.token });
  var wishlist = findUser.wishlist;
  res.json({wishlist});
});

/* ADD ARTICLE IN WISHLIST */
router.post('/add-wishlist', async function (req, res, next) {
  var findUser = await userModel.findOne({ token: req.body.token });
  var inList = false
  var wishlist = findUser.wishlist
  for (i = 0; i < wishlist.length; i++) {
    if (wishlist[i].title == req.body.title) {
      inList = true
    }
  }
  if (inList == false) {
    console.log("j'enregistre en base de donnée")
    findUser.wishlist.push(
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        img: req.body.img,
      }
    )
    var saved = await findUser.save();
    res.json({ saved });
  }
});


/* DELETE ARTICLE IN WISHLIST */
router.post('/delete-wishlist', async function (req, res, next) {
  var findUser = await userModel.findOne({ token: req.body.token });
  var updatedUser = findUser.wishlist.filter((e) => (e.title !== req.body.title))
  findUser.wishlist = updatedUser
  var saved = await findUser.save();  
  console.log(saved);
  res.json({ saved });
});
module.exports = router;
