var db = require('./db.js');
    module.exports = {
    read: function (email, callback) {
        db.query("SELECT * from Utilisateur where email= ?",email, function
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
    create: function (email ,nom ,prenom ,password, tel, callback) {
        rows = db.query("INSERT INTO Utilisateur VALUES (NULL,?,?,?,?,?,1)", [email,nom, prenom, tel,password], function (err, results) {
            if (err) throw err;
            callback(true);
        });
        
    },

}