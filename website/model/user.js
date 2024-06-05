var db = require("./db.js");
const pass = require('../utils/passwd.js');
const session = require('../utils/session.js');


module.exports = {

  readall: function (callback) {
    db.query("SELECT * from Utilisateur", function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  applied:function(id_utilisateur,callback){
    var sql = "SELECT Organisation.name AS Name, Fiche_poste.intitule AS Intitule, Offre.id_offre AS IdOffre FROM Organisation JOIN Offre_Organisation ON Organisation.siret = Offre_Organisation.org JOIN Offre ON Offre_Organisation.offre = Offre.id_offre JOIN Fiche_poste ON Offre.fiche_poste = Fiche_poste.id_fiche_poste JOIN Candidature ON Offre.id_offre = Candidature.offre WHERE Candidature.candidat = ?;"
    db.query(sql, [id_utilisateur], function (err, results) {
      if (err) {
        
          callback(err, null);
      } else {
        callback(null, results);
      }
  });
  },

  areValid: function (email, password, callback) {
    const sql = "SELECT * FROM Utilisateur WHERE email = ?";
    db.query(sql, email, function (err, results) {
        if (err) {
            callback(err, null);
        } else if (results.length === 0) {
            callback(err, false);
        } else {
            const hash = results[0].password;
            pass.comparePassword(password, hash, function (result) {
                callback(null, result);
            });
        }
    });
  },


  read: function (email, callback) {
      const sql = "SELECT Utilisateur.id_utilisateur,Utilisateur.email,Utilisateur.nom,Utilisateur.prenom,Utilisateur.tel,Utilisateur.password,Utilisateur_Roles_Approuves.type_utilisateur AS role FROM Utilisateur LEFT JOIN ( SELECT id_utilisateur, type_utilisateur FROM Utilisateur_Roles WHERE state_user = 'Approuvée' ) AS Utilisateur_Roles_Approuves ON Utilisateur.id_utilisateur = Utilisateur_Roles_Approuves.id_utilisateur WHERE is_active = 1 AND email= ?";
      db.query(sql, email, function (err, results) {
          if (err) {
              callback(err, null);
          } else if (results.length === 0) {
              callback(new TypeError("Error : email not found!"), results);
          } else callback(null, results);
      });
  },
  already: function (id_offre, id_utilisateur, callback) {
    var sql = "SELECT * FROM Candidature WHERE offre=? AND candidat=?";
    db.query(sql, [id_offre, id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    }); 
},

alreadyadmin: function (id_utilisateur, callback) {
    var sql = "SELECT * FROM Utilisateur_Roles WHERE id_utilisateur = ? AND type_utilisateur = 'Administrateur'";
    db.query(sql, [id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    }); 
},

alreadyrecruteur: function (id_utilisateur, callback) {
    var sql = "SELECT * FROM Utilisateur_Roles WHERE id_utilisateur = ? AND type_utilisateur = 'Recruteur'";
    db.query(sql, [id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    }); 
},
  alreadyDetail:function(id_offre, callback){
    const sql = `SELECT O.id_offre AS IdOffre, O.indications AS Indications, FP.intitule AS Intitule_Poste, FP.description AS Description_Poste, FP.salaire_min AS Salaire_Minimum, FP.salaire_max AS Salaire_Maximum, FP.rythme_travail AS Rythme_Travail, FP.responsable_hierarchique AS Responsable_Hierarchique, FP.statuts_poste AS Statut_Poste, L.adresse AS Adresse_Lieu, L.ville AS Ville, L.postcode AS Code_Postal, L.pays AS Pays, R.prenom AS Prenom_Recruteur, R.nom AS Nom_Recruteur, R.email AS Email_Recruteur, R.tel AS Telephone_Recruteur, Org.name AS Nom_Organisation FROM Offre O INNER JOIN Offre_Organisation OO ON O.id_offre = OO.offre INNER JOIN Organisation Org ON OO.org = Org.siret INNER JOIN Fiche_poste FP ON O.fiche_poste = FP.id_fiche_poste INNER JOIN Lieu L ON FP.lieu = L.id_lieu INNER JOIN Utilisateur R ON FP.recruteur = R.id_utilisateur WHERE O.id_offre = ?;`;
    db.query(sql, [id_offre], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });

  },



  verifsiret:function(siret, callback){
    const sql = "SELECT * from Organisation WHERE siret = ?";
    db.query(sql, [siret], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });

  },



  readById: function (id, callback) {
      const sql = "SELECT * FROM Utilisateur WHERE id_utilisateur = ?";
      db.query(sql, id, function (err, results) {
          if (err) {
              callback(err, null);
          } else if (results.length === 0) {
              callback(new TypeError("Error : ID not found!"), results);
          } else callback(null, results);
      });
  },

  create: function (nom, prenom, pwd, tel, email, callback) {
    pass.generateHash(pwd, function (hash) {
        pwd = hash;
        const sql = "INSERT INTO `Utilisateur` VALUES (NULL,?, ?, ?, ?, ?, 1);";
        db.query(sql, [email, nom, prenom, tel, pwd], function (err, results) {
            if (err) {
                callback(err, null);
            } else {callback(null, results)};
        });
    });
},

update: function (id, data, callback) {
    const {nom, prenom, telephone, email} = data;
    const sql = "UPDATE Utilisateur SET nom = ?, prenom = ?, telephone = ?, email = ? WHERE id_utilisateur = ?";
    db.query(sql, [nom, prenom, telephone, email, id], function (err, results) {
        if (err) {
            callback(err, null);
        } else callback(null, results);
    });
},

unpostule: function(id_offre, id_utilisateur, callback) {
    var sql = "DELETE FROM Candidature WHERE offre = ? AND candidat = ?";
    db.query(sql, [id_offre, id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},

supporga: function(siret, callback) {
    var sql = "DELETE FROM Organisation WHERE siret = ?";
    db.query(sql, [siret], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},


findorga: function(siret, callback) {
    var sql = "select * FROM Organisation WHERE siret = ?";
    db.query(sql, [siret], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},


unaskadmin: function(id_utilisateur, callback) {
    var sql = "DELETE FROM Utilisateur_Roles WHERE id_utilisateur = ? AND type_utilisateur = 'Administrateur'";
    db.query(sql, [id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},

unaskrecruteur: function(id_utilisateur, callback) {
    var sql = "DELETE FROM Utilisateur_Roles WHERE id_utilisateur = ? AND type_utilisateur = 'Recruteur'";
    db.query(sql, [id_utilisateur], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},

// à modifier pour vérifier qu'il n'y ait pas déjà une demande en cours
makeAdmin: function (id, reason, callback) {
    const sql = "INSERT INTO Utilisateur_Roles VALUES(?, 'Administrateur','En attente',NULL,?)";
    db.query(sql, [id,reason], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            // get the email of the user, to notify him
            const sql = "SELECT email FROM Utilisateur WHERE id_utilisateur = ?";
            db.query(sql, id, function (err2, email) {
                if (err2) {callback(err2, null)}
                else {callback(null, email)}
            });
        }
    });
}, 

makeRecruteur: function (id, siret, reason, callback) {
    const sql = "INSERT INTO Utilisateur_Roles VALUES(?, 'Recruteur','En attente',?,?)";
    db.query(sql, [id,siret,reason], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            // get the email of the user, to notify him
            const sql = "SELECT email FROM Utilisateur WHERE id_utilisateur = ?";
            db.query(sql, id, function (err2, email) {
                if (err2) {callback(err2, null)}
                else {callback(null, email)}
            });
        }
    });
}, 
addaddress: function (adresse, ville, postcode, pays, callback) {
    const sql = "INSERT INTO Lieu (adresse, ville, postcode, pays) VALUES (?, ?, ?, ?)";
    db.query(sql, [adresse, ville, postcode, pays], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            console.log("tu as réussi à créer un lieu");
            const sql = "SELECT * from Lieu WHERE adresse = ? AND ville = ? AND postcode = ? AND pays = ? LIMIT 1";
            db.query(sql, [adresse, ville, postcode, pays], function (err, lieu) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null,lieu);
                }
        });
    }});
},

createorg: function (siret, nom, lieu, type, id_utilisateur, callback) {
    const sql = "INSERT INTO Organisation (siret, name, adresse, type, state) VALUES (?, ?, ?, ?, 'En attente')";
    db.query(sql, [siret, nom, lieu[0].id_lieu, type], function (err, results, orga) {
        if (err) {
            // gerer l'erreur si le siret est de taille superieure à 11
            console.log(siret, nom, lieu, type);
            callback(err, null, null);
        } else {

            console.log("tu as réussi à créer une orga");
            // get the email of the user, to notify him
            const sql = "SELECT email FROM Utilisateur WHERE id_utilisateur = ?";
            db.query(sql, id_utilisateur, function (err2, email, siret) {
                if (err2) {callback(err2, null, null)}
                else {
                    callback(null, email, siret)    
            };
        });
    }});
}, 


getAllFromCand: function(id_offer,id_user, callback) {
    const sql = "SELECT * FROM Pieces_dossier LEFT OUTER JOIN Candidature ON Candidature.id_candidature=Pieces_dossier.candidature WHERE offre = ? AND candidat= ? ";
    db.query(sql, [id_offer,id_user], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},


deleteFile: function(id_file, callback) {
    const sql = "DELETE FROM Pieces_dossier WHERE id_piece = ? ";
    db.query(sql, [id_file], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
},


/* makeAdmin: function (id, callback) {
    const sql = "UPDATE utilisateur SET type = 'admin' WHERE id = ?";
    db.query(sql, id, function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            // get the email of the user, to notify him
            const sql = "SELECT email FROM utilisateur WHERE id = ?";
            db.query(sql, id, function (err2, results2) {
                if (err2) callback(err2, null)
                else callback(null, results2)
            });
        }
    });
}, */

};
