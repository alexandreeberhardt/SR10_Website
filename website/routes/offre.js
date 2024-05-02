var express = require("express");
var router = express.Router();
var offreModel = require("../model/offer");


router.get("/offer", function (req, res, next) {
  result = offreModel.readAll("Active", function (result) {
    console.log(result);
    res.render("offres/offre", {
      title: "Visualisation des offres",
      result: result,
    });
  });
});

router.get('/:id_offre', function (req, res) {
  const id_offre = req.params.id_offre;
  offreModel.offreDetail(id_offre, function(err, result) {
      if (err) {
          console.error('Error fetching offer details', err);
          return res.status(500).send('Error fetching offer details');
      }
      if (result.length > 0) {
          res.render('offres/detail_offre', { offre: result });
      } else {
          res.status(404).send('Offer not found');
      }
  });
});


module.exports = router;
