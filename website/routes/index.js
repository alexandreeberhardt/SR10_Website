var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/login/login");
});


router.get("/404", function (req, res, next) {
  res.render("404");
});

router.get("/403", function (req, res, next) {
  res.render("403");
});

module.exports = router;
