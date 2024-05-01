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

  applied: function (id, callback) {
    db.query("SELECT intitule,Organisation.name FROM `Candidature` INNER JOIN Offre ON Offre.id_offre = Candidature.id_candidature INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste INNER JOIN State_demande ON State_demande.state_value = Candidature.state INNER JOIN Offre_Organisation ON Offre_Organisation.offre = Offre.id_offre INNER JOIN Organisation ON Organisation.siret = Offre_Organisation.org WHERE State_demande.state_value = 'En attente' AND Candidature.candidat = ?",id, function (err, results) {
      if (err) throw err;
      callback(results);
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


// à modifier pour vérifier qu'il n'y ait pas déjà une demande en cours
makeAdmin: function (id, reason, callback) {
    const sql = "INSERT INTO Utilisateur_Roles VALUES(?, 'Administrateur','En attente',NULL,?)";
    db.query(sql, [id,reason], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            // get the email of the user, to notify him
            const sql = "SELECT email FROM Utilisateur WHERE id = ?";
            db.query(sql, id, function (err2, email) {
                if (err2) callback(err2, null)
                else callback(null, email)
            });
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
