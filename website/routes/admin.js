var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
const { removeAllListeners } = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  result=userModel.readall(function(result){
  res.render('usersList', { title: 'List des utilisateurs', users:
  result });
});
});



module.exports = router;
