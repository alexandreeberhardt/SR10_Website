var db = require('./db.js');
    module.exports = {


    read: function (id, callback) {
        db.query("SELECT * from Offre  INNER JOIN State_offre INNER JOIN Fiche_poste ON Fiche_poste.id_fiche_poste = Offre.fiche_poste WHERE Offre.id_offre= ?",id, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("SELECT * from Utilisateur", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT password FROM Utilisateur WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },


}