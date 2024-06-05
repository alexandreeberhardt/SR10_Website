var express = require("express");
var router = express.Router();
var offreModel = require("../model/offer");
const session = require('../utils/session.js');
const fs = require('fs');
var multer = require('multer');

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Erreur lors de la suppression du fichier ${filePath}: `, err);
        } else {
            console.log(`Le fichier ${filePath} a été supprimé avec succès.`);
        }
    });
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {cb(null, "./uploads"); },
    filename: function (req, file, cb) {
        const username = `${req.session.user.nom}-${req.session.user.prenom}`;
        const offerId = req.params.id_offre;
        const originalName = file.originalname.replace(/ /g, '-');
        const extension = originalName.split('.').pop();
        const date = new Date();
        const formattedDate = `${date.getFullYear().toString().substr(-2)}:${(date.getMonth() + 1).toString().padStart(2, '0')}:${date.getDate().toString().padStart(2, '0')}:${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `${originalName}-${username}-${offerId}-${formattedDate}.${extension}`;
        const final = fileName.replace(':','-');
        cb(null, final);
    }
});
function fileFilter(req, file, cb) {
    if (file.mimetype === 'application/pdf') {cb(null, true); } 
    else {cb(new Error('Seuls les fichiers PDF sont autorisés.')); }
}
const upload = multer({ 
    dest : './uploads/',
    storage: storage,
    fileFilter: fileFilter
});

  
  router.get('/getfile', function(req, res, next) {
    try {
      res.download('./uploads/'+req.query.fichier_cible);
    } catch (error) {
      res.send('Erreur lors du chargement du fichier '+req.query.fichier_cible+' : '+error);
    }
});

router.post('/:id_offre', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'lettre', maxCount: 1 }, { name: 'uid', maxCount: 1 }]),  (req, res) => {    
    
    const session = req.session;
    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }
    
    const id_offre = req.params.id_offre;
    const id_utilisateur = req.session.user.id_utilisateur; 
    const path1 = req.files && req.files.cv? req.files.cv[0].path : null;
    const path2 = req.files && req.files.lettre? req.files.lettre[0].path : null;
    const path3 = req.files && req.files.uid? req.files.uid[0].path : null;

    offreModel.already(id_offre, id_utilisateur, function (err, results) {
        if (err) {
            console.error('Error checking existing application', err);
            return res.status(500).send('Error processing your application');
        }
        if (results.length > 0) {

            // on supprimer les fichiers déjà ajoutés 
            if(path1 !== null){
                deleteFile(path1);
            }
            if(path2 !== null){
                deleteFile(path2);
            }
            if(path3 !== null){
                deleteFile(path3);
            }
            
            res.status(409).render('offres/dejapostule', { title: "Postule",  offre: result, user: req.session.user });
            } else {
            offreModel.postule(id_offre, id_utilisateur, function (err, result) {
                if (err) {
                    console.error('Error applying for the offer', err);
                    return res.status(500).send('Error applying for the offer');
                }

                offreModel.getCandId(id_utilisateur,id_offre, function(err,result){
                    if (err){
                        return res.status(500).send('Error applying for the offer');
                    }
                    let id_candidature = result[0];
                    const candidature = parseInt(id_candidature.id_candidature, 10);
                    
                    
                    console.log(path1,path2,path3,candidature)

                    if(path1!==null){
                        offreModel.enterFile(path1,'CV',candidature,function(err,result){
                            if (err){
                                return res.status(500).send('Error applying for the offer');
                            }
                        });  
                    }
                    if (path2!==null){
                        offreModel.enterFile(path2,'Lettre de motivation',candidature,function(err,result){
                            if (err){
                                return res.status(500).send('Error applying for the offer');
                            }
                        });   
                    }
                    if(path3 !== null){
                        offreModel.enterFile(path3,'Certificat de travail',candidature,function(err,result){
                            if (err){
                                return res.status(500).send('Error applying for the offer');
                            }
                        });
                    }  

                    console.log("Vous venez de postuler ! id_offre :",id_offre, "id_utilisateur : ",id_utilisateur)
                    res.render('offres/postule', { title: "Postule",  offre: result, user: req.session.user });    
                });
            });
        }
    });
});






router.get("/offer", function (req, res, next) {
    const session = req.session;

    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

  result = offreModel.readAll("Active", function (result) {
    console.log(result);
    res.render("offres/offre", {
      title: "Visualisation des offres",
      result: result,
      role: session.role
    });
  });
});

router.get('/:id_offre', function (req, res) {
    const session = req.session;

    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

  const id_offre = req.params.id_offre;
  offreModel.offreDetail(id_offre, function(err, result) {
      if (err) {
          console.error('Error fetching offer details', err);
          return res.status(500).send('Error fetching offer details');
      }
      if (result.length > 0) {
          res.render('offres/detail_offre', {offre: result, role: session.role});
      } else {
          res.status(404).send('Offer not found');                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
          console.log("Il n'y a pas de candidats");
      }
  });
});


router.post('/:id_offre', function (req, res) {
    const session = req.session;
    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

    const id_offre = req.params.id_offre;
    const id_utilisateur = req.session.user.id_utilisateur; 

    offreModel.already(id_offre, id_utilisateur, function (err, results) {
        if (err) {
            console.error('Error checking existing application', err);
            return res.status(500).send('Error processing your application');
        }
        if (results.length > 0) {
            res.status(409).render('offres/dejapostule', { title: "Postule",  offre: result, user: req.session.user });
        } else {
            offreModel.postule(id_offre, id_utilisateur, function (err, result) {
                if (err) {
                    console.error('Error applying for the offer', err);
                    return res.status(500).send('Error applying for the offer');
                }
                console.log("Vous venez de postuler ! id_offre :",id_offre, "id_utilisateur : ",id_utilisateur)
                res.render('offres/postule', { title: "Postule",  offre: result, user: req.session.user });
            });
        }
    });
});

module.exports = router;
