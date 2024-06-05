var express = require("express");
var router = express.Router();
var userModel = require("../model/user");


router.get('/users', function (req, res, next) {
    result=userModel.readall(function(result){
    res.status(200).json(result);
    });
});

module.exports = router;
