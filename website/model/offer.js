var db = require("./db.js");
module.exports = {
  read: function (id, callback) {
    db.query(
      "SELECT * from Offre  INNER JOIN State_offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste WHERE Offre.id_offre= ?",
      id,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },

  readAll: function (state, callback) {
    db.query(
      "SELECT Fiche_poste.intitule, Fiche_poste.rythme_travail, Fiche_poste.salaire_min, Fiche_poste.salaire_max,Statuts_poste.statuts, Organisation.name, Lieu.pays FROM Offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste INNER JOIN State_offre ON State_offre.etat = Offre.etat INNER JOIN Statuts_poste ON Fiche_poste.statuts_poste = Statuts_poste.statuts INNER JOIN Offre_Organisation ON Offre_Organisation.offre = Offre.id_offre INNER JOIN Organisation ON Organisation.siret = Offre_Organisation.org INNER JOIN Lieu ON Organisation.adresse = Lieu.id_lieu WHERE State_offre.etat = ?",
      state,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
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
};
