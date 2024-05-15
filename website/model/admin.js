var db = require("./db.js");
const { applied } = require("./user.js");
module.exports = {
  demandeUsers: function (id, callback) {
    db.query(
      "SELECT Utilisateur.id_utilisateur AS id,Utilisateur_Roles.type_utilisateur AS role, organisation, reason, nom, prenom FROM `Utilisateur_Roles`INNER JOIN Utilisateur ON Utilisateur_Roles.id_utilisateur = Utilisateur.id_utilisateur WHERE state_user = 'En attente' AND is_active = 1 ",
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },
  demandeOrg: function (id, callback) {
    db.query(
      "SELECT organisation_siret, id_utilisateur, nom, prenom FROM `Recruteur_Organisation` INNER JOIN Utilisateur ON recruteur = Utilisateur.id_utilisateur WHERE state = 'En attente' AND is_active = 1",
      function (err, results) {
        if (err) throw err;
        callback(results);
      },
    );
  },


}
