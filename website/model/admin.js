const db = require("./db.js");
const { applied } = require("./user.js");

module.exports = {
  demandeUsers: function (callback) {
    const query = `
      SELECT 
        Utilisateur.id_utilisateur AS id,
        Utilisateur_Roles.type_utilisateur AS role,
        organisation,
        reason,
        nom,
        prenom
      FROM Utilisateur_Roles
      INNER JOIN Utilisateur ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur
      WHERE state_user = 'En attente' AND is_active = 1
    `;

    db.query(query, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  acceptRole: function (id,callback) {
    const query = `
      UPDATE Utilisateur_Roles SET state_user = 'Approuvée' WHERE id_utilisateur = ?
    `;
    db.query(query,id, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  denyRole: function (id,callback) {
    const query = `
      UPDATE Utilisateur_Roles SET state_user = 'Rejetée' WHERE id_utilisateur = ?
    `;
    db.query(query,id, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  acceptOrg: function (siret,callback) {
    const query = `
      UPDATE Organisation SET state = 'Approuvée' WHERE siret = ?
    `;
    db.query(query,siret, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  denyOrg: function (siret,callback) {
    const query = `
      UPDATE Organisation SET state = 'Rejetée' WHERE siret = ?
    `;
    db.query(query,siret, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },
  
  demandeUsersbyId: function (id,callback) {
    const query = `
      SELECT 
        Utilisateur.id_utilisateur AS id,
        Utilisateur_Roles.type_utilisateur AS role,
        organisation,
        reason,
        nom,
        prenom
      FROM Utilisateur_Roles
      INNER JOIN Utilisateur ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur
      WHERE state_user = 'En attente' AND is_active = 1 AND Utilisateur.id_utilisateur = ?
    `;
    db.query(query,id, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },


  demandeOrgbyId: function (siret,callback) {
    const query = `
    SELECT siret, name AS orgname, type, ville, pays FROM Organisation INNER JOIN Lieu on Organisation.adresse = Lieu.id_lieu WHERE state= 'EN attente' AND siret = ?
    `;
    db.query(query,siret, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  upgradeUser: function (role,id,callback) {
    // 
    const query = `
      SELECT 
        Utilisateur.id_utilisateur AS id,
        Utilisateur_Roles.type_utilisateur AS role,
        organisation,
        reason,
        nom,
        prenom
      FROM Utilisateur_Roles
      INNER JOIN Utilisateur ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur
      WHERE state_user = 'En attente' AND is_active = 1 AND Utilisateur.id_utilisateur = ?
    `;

    db.query(query,id, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  demandeOrg: function (callback) {
    const query = `
    SELECT siret, name AS orgname, type, ville, pays FROM Organisation INNER JOIN Lieu on Organisation.adresse = Lieu.id_lieu WHERE state= 'EN attente'
    `;
    db.query(query, function(err, results){
      if (err) throw err;
      callback(results);
    });
  },
};

