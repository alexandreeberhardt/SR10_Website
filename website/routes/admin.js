var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
var adminModel = require("../model/admin");

const session = require('../utils/session.js');

/* GET users listing. */




router.get("/account", function (req, res, next) {
    const session = req.session;

    if (session.role != "Administrateur"){
        
          return res.status(403).send("Accès interdit.");
        
      }

    let results  = {
            "items1": [],
            "items2" : []
            }
    
    adminModel.demandeUsers(function(err,res1){
        if(err){
            res.render("error",err) 
        }else{
            // on fait appel à la 2e pour récupérer tout ce dont on a besoin
            console.log(res1)
            adminModel.demandeOrg(function(err,res2){
                if(err){
                    res.render("error",err) 
                }else{
                    // On ajoute tout dans le tableau
                    console.log(res2)
                }
            })

        }

    }
)

    res.render("admin/account", { title: "Account Admin" });
  });



module.exports = router;
