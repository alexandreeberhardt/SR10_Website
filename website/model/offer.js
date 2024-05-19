var db = require("./db.js");
const { applied } = require("./user.js");
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
      "SELECT Fiche_poste.intitule, Fiche_poste.rythme_travail, Fiche_poste.salaire_min, Fiche_poste.salaire_max,Statuts_poste.statuts, Organisation.name, Lieu.pays, State_offre.etat, Offre.id_offre FROM Offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste INNER JOIN State_offre ON State_offre.etat = Offre.etat INNER JOIN Statuts_poste ON Fiche_poste.statuts_poste = Statuts_poste.statuts INNER JOIN Offre_Organisation ON Offre_Organisation.offre = Offre.id_offre INNER JOIN Organisation ON Organisation.siret = Offre_Organisation.org INNER JOIN Lieu ON Organisation.adresse = Lieu.id_lieu WHERE State_offre.etat = ?",
      state,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },

  offreDetail: function(id_offre, callback) {
    const sql = `SELECT O.id_offre AS IdOffre, O.indications AS Indications, FP.intitule AS Intitule_Poste, FP.description AS Description_Poste, FP.salaire_min AS Salaire_Minimum, FP.salaire_max AS Salaire_Maximum, FP.rythme_travail AS Rythme_Travail, FP.responsable_hierarchique AS Responsable_Hierarchique, FP.statuts_poste AS Statut_Poste, L.adresse AS Adresse_Lieu, L.ville AS Ville, L.postcode AS Code_Postal, L.pays AS Pays, R.prenom AS Prenom_Recruteur, R.nom AS Nom_Recruteur, R.email AS Email_Recruteur, R.tel AS Telephone_Recruteur, Org.name AS Nom_Organisation FROM Offre O INNER JOIN Offre_Organisation OO ON O.id_offre = OO.offre INNER JOIN Organisation Org ON OO.org = Org.siret INNER JOIN Fiche_poste FP ON O.fiche_poste = FP.id_fiche_poste INNER JOIN Lieu L ON FP.lieu = L.id_lieu INNER JOIN Utilisateur R ON FP.recruteur = R.id_utilisateur WHERE FP.id_fiche_poste= ?;`;
    db.query(sql, [id_offre], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
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



postule: function (id_offre, id_utilisateur, callback) {
  var sql = "INSERT INTO Candidature (date_candidature, last_modified, offre, candidat, state) VALUES(NOW(), NOW(), ?, ?, 'En attente')";
  db.query(sql, [id_offre, id_utilisateur], function (err, results) {
      if (err) {
          callback(err, null);
      } else {
          callback(null, results);
      }
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
};
