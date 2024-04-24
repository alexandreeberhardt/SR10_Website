var db = require('./db.js');
    module.exports = {

    readDemandeAdmin: function (status, callback) {
        db.query("SELECT UR.type_utilisateur AS 'Type', CONCAT(U.nom,' ', U.prenom) AS 'Demandeur', UR.state_user AS 'Status de la demande' FROM Utilisateur_Roles UR JOIN Utilisateur U ON UR.id_utilisateur = U.id_utilisateur WHERE UR.type_utilisateur = 'Administrateur' AND UR.state_user = 'En attente'",status, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },   


}