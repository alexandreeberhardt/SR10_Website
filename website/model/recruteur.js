var db = require("./db.js");
module.exports = {
  readCandidatures: function (status, callback) {
    db.query(
      "SELECT Candidature.date_candidature, Utilisateur.nom, Utilisateur.prenom, Fiche_poste.intitule FROM Candidature INNER JOIN Utilisateur ON Candidature.candidat = Utilisateur.id_utilisateur INNER JOIN State_demande ON State_demande.state_value = Candidature.state INNER JOIN Offre ON Offre.id_offre = Candidature.offre INNER JOIN Fiche_poste ON Offre.fiche_poste = Fiche_poste.id_fiche_poste WHERE State_demande.state_value = ?",
      status,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
  readNewRecruteur: function (id, callback) {
    db.query(
      "SELECT * from Offre  INNER JOIN State_offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste WHERE Offre.id_offre= ?",
      id,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
  readAllOffres: function (id_recruteur, callback) {
    db.query(
      "SELECT fp.id_fiche_poste, fp.intitule, fp.rythme_travail, fp.salaire_min, fp.salaire_max, fp.statuts_poste, o.id_offre FROM Offre o JOIN Fiche_poste fp ON o.fiche_poste = fp.id_fiche_poste WHERE fp.recruteur = ?",
      id_recruteur,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
  getAllCandidats: function (id_offre, callback) {
    db.query(
      "SELECT u.id_utilisateur, u.email, u.nom, u.prenom, u.tel, u.is_active, c.offre, c.state FROM Candidature c JOIN Utilisateur u ON c.candidat = u.id_utilisateur WHERE c.offre = ? AND u.is_active = 1;",
      [id_offre],
      function (err, results) {
        if (err) callback(err, null);
        callback(null, results);
      },
    );
  },
  readAllRequests: function (state, organisation, callback) {
    db.query(
      "SELECT UR.type_utilisateur AS 'Type', CONCAT(U.nom,' ', U.prenom) AS 'Demandeur', UR.state_user AS 'Status de la demande', UR.organisation FROM Utilisateur_Roles UR JOIN Utilisateur U ON UR.id_utilisateur = U.id_utilisateur INNER JOIN Organisation ON Organisation.siret = UR.organisation WHERE UR.type_utilisateur = 'Recruteur' AND UR.state_user = ? AND Organisation.name= ?",
      [state, organisation],  
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
  

  getOrgForRecruteur: function (id, callback) {
    db.query(
      "SELECT * FROM `Organisation` INNER JOIN Recruteur_Organisation ON Organisation.siret = Recruteur_Organisation.organisation_siret WHERE Recruteur_Organisation.recruteur = ?  ",
      id,
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },


 getNewApplicantsRecruters: function(id, callback) {
  db.query(
    "SELECT * FROM `Organisation` INNER JOIN Recruteur_Organisation ON Organisation.siret = Recruteur_Organisation.organisation_siret WHERE Recruteur_Organisation.recruteur = ?",
    id,
    function (err, results) {
      if (err) throw err;
      callback(results);
    },
  );
},


quitOrg: function(id,siret,callback){
  db.query(
    "UPDATE Recruteur_Organisation SET state = 'Deleted' WHERE recruteur = ? AND organisation_siret = ?",[id,siret],function(err,results){
      if (err) throw err;
      callback(results);
    },
  );
},

creerFichePoste: function (intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, recruteur, responsable_hierarchique, callback) {
  const sql = "INSERT INTO Fiche_poste (intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, lieu, recruteur, is_active, responsable_hierarchique) VALUES (?, ?, ?, ?, ?, ?, 1, ?, 1, ?)"  ;
  db.query(sql, [intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, recruteur, responsable_hierarchique], function (err, results) {
      if (err) {
          callback(err, null);
      } else {
          callback(null, results);
      }
  });
},





creerOffre: function ( expiration, indications, fiche_poste, callback) {
  const sql = "INSERT INTO Offre (expiration, indications, fiche_poste, etat) VALUES (?, ?, ?, 'Active')"  ;
  db.query(sql, [expiration, indications, fiche_poste], function (err, results) {
      if (err) {
          callback(err, null);
      } else {
          callback(null, results);
      }
  });
},

getSiret : function(id_utilisateur, callback){
  const sql = "SELECT organisation FROM Utilisateur_Roles WHERE id_utilisateur = ? AND type_utilisateur = 'Recruteur'";
  db.query(sql, [id_utilisateur], function (err, results) {
    if (err) {
        callback(err, null);
    } else {
        callback(null, results);
    }
});
},
getIdOffre: function(callback){
  const sql = "SELECT id_offre FROM Offre ORDER BY id_offre DESC LIMIT 1;";
  db.query(sql, function (err, results) {
    if (err) {
        callback(err, null);
    } else {
        callback(null, results);
    }
});

},
offreOrga: function(siret, id_offre, callback){
  const sql = "INSERT INTO Offre_Organisation (offre, org) VALUES (?, ?)"  ;
  db.query(sql, [id_offre, siret], function (err, results) {
    if (err) {
        callback(err, null);
    } else {
        callback(null, results);
    }
});
},

getIntitule: function(id_recruteur,callback){
  const sql = "SELECT id_fiche_poste, intitule FROM Fiche_poste WHERE recruteur = ? AND is_active = 1";
  db.query(sql, [id_recruteur], function (err, results) {
    if (err) {
        callback(err, null);
    } else {
        callback(null, results);
    }
});
}



};












