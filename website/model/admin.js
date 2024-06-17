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

  acceptRole: function (id,role,callback) {
    const query = `
      UPDATE Utilisateur_Roles SET state_user = 'Approuvée' WHERE id_utilisateur = ? AND type_utilisateur = ?
    `;
    db.query(query,[id,role], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  denyRole: function (id,role,callback) {
    const query = `
      UPDATE Utilisateur_Roles SET state_user = 'Rejetée' WHERE id_utilisateur = ? AND type_utilisateur = ?
    `;
    db.query(query,[id,role], function(err, results) {
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
  
  demandeUsersbyId: function (id,role,callback) {
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
      WHERE state_user = 'En attente' AND is_active = 1 AND Utilisateur.id_utilisateur = ? AND Utilisateur_Roles.type_utilisateur = ? 
    `;
    db.query(query,[id,role], function(err, results) {
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

  getAllUsers: function (callback) {
    const query = `
    SELECT Utilisateur.id_utilisateur,Utilisateur.email,Utilisateur.prenom,Utilisateur.nom,Utilisateur.is_active,Utilisateur_Roles.type_utilisateur,Utilisateur_Roles.state_user,Utilisateur_Roles.organisation FROM Utilisateur LEFT OUTER JOIN Utilisateur_Roles ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur;    `;
    db.query(query, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  getAllFromUser: function (id,callback) {
    const query = `
      SELECT Utilisateur.id_utilisateur,Utilisateur.email,Utilisateur.prenom,Utilisateur.nom,Utilisateur.tel,Utilisateur.is_active,Utilisateur_Roles.type_utilisateur,Utilisateur_Roles.state_user,Utilisateur_Roles.organisation FROM Utilisateur LEFT OUTER JOIN Utilisateur_Roles ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur WHERE Utilisateur.id_utilisateur = ?
    `;
    db.query(query,id, function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  updateUser: function (val, id, callback) {
    console.log(val,id)
    const query = `
        UPDATE Utilisateur SET is_active = ? WHERE id_utilisateur = ?
    `;
    db.query(query,[val,id], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  modifyUserName : function(id_user, new_var, callback){
    const query = `
        UPDATE Utilisateur SET nom = ? WHERE id_utilisateur = ?
    `;
    db.query(query,[new_var,id_user], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  modifyUserMail : function(id_user, new_var, callback){
    const query = `
        UPDATE Utilisateur SET email = ? WHERE id_utilisateur = ?
    `;
    db.query(query,[new_var,id_user], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  modifyUserSurname : function(id_user, new_var, callback){
    const query = `
        UPDATE Utilisateur SET prenom = ? WHERE id_utilisateur = ?
    `;
    db.query(query,[new_var,id_user], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },

  modifyUserTel : function(id_user, new_var, callback){
    const query = `
        UPDATE Utilisateur SET tel = ? WHERE id_utilisateur = ?
    `;
    db.query(query,[new_var,id_user], function(err, results) {
      if (err) throw err;
      callback(err,results);
    });
  },


};

