var db = require("./db.js");
const pass = require('../utils/passwd.js');

module.exports = {
  read: function (email, callback) {
    db.query(
      "SELECT * from Utilisateur where email= ?",
      email,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
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


  create: function (email, nom, prenom, password, tel, callback) {
    rows = db.query(
      "INSERT INTO Utilisateur VALUES (NULL,?,?,?,?,?,1)",
      [email, nom, prenom, tel, password],
      function (err, results) {
        if (err) throw err;
        callback(true);
      },
    );
  },

  read: function (email, callback) {
      const sql = "SELECT * FROM Utilisateur WHERE email = ?";
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

  create: function (nom, prenom, pwd, tel, email, adresse, callback) {
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
