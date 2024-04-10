var db = require('./db.js');
    module.exports = {

    readCandidatures: function (status, callback) {
        db.query("SELECT Candidature.date_candidature, Utilisateur.nom, Utilisateur.prenom, Fiche_poste.intitule FROM Candidature INNER JOIN Utilisateur ON Candidature.candidat = Utilisateur.id_utilisateur INNER JOIN State_demande ON State_demande.state_value = Candidature.state INNER JOIN Offre ON Offre.id_offre = Candidature.offre INNER JOIN Fiche_poste ON Offre.fiche_poste = Fiche_poste.id_fiche_poste WHERE State_demande.state_value = ?",status, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readNewRecruteur: function (id, callback) {
        db.query("SELECT * from Offre  INNER JOIN State_offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste WHERE Offre.id_offre= ?",id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readAllRequests: function (state, callback) {
        db.query("SELECT UR.type_utilisateur AS 'Type', CONCAT(U.nom,' ', U.prenom) AS 'Demandeur', UR.state_user AS 'Status de la demande' FROM Utilisateur_Roles UR JOIN Utilisateur U ON UR.id_utilisateur = U.id_utilisateur WHERE UR.type_utilisateur = 'Administrateur' AND UR.state_user = ?",state, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },



}