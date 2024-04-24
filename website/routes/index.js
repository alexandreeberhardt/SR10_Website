var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Recru't" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Recru't" });
});

module.exports = router;
