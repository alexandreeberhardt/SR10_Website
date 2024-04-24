var db = require("./db.js");
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
    sql = "SELECT password FROM Utilisateur WHERE email = ?";
    rows = db.query(sql, email, function (err, results) {
      if (err) throw err;
      if (rows.length == 1 && rows[0].pwd === password) {
        callback(true);
      } else {
        callback(false);
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
};
