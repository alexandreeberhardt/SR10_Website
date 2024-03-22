const db = require('./db.js');

module.exports = {
    init_type_utilisateur: function (callback) {
        let sql = `
        CREATE TABLE IF NOT EXISTS Type_utilisateur(
            type_utilisateur VARCHAR(250) PRIMARY KEY
        ); `
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_state: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS State(
            state_value VARCHAR(250) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_user: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Utilisateur(
            id_utilisateur INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(250) UNIQUE NOT NULL,
            nom VARCHAR(50) NOT NULL,
            prenom VARCHAR(50) NOT NULL,
            tel VARCHAR(50) NOT NULL,
            password VARCHAR(500) NOT NULL
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},
    init_user_role: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Utilisateur_Roles(
            id_utilisateur INTEGER NOT NULL,
            type_utilisateur VARCHAR(250) NOT NULL,
            state_user VARCHAR(250) NOT NULL,
            FOREIGN KEY (state_user) REFERENCES State(state_value),
            FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
            FOREIGN KEY (type_utilisateur) REFERENCES Type_utilisateur(type_utilisateur),
            PRIMARY KEY (id_utilisateur, type_utilisateur)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_type_organisation: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Type_Organisation(
            name VARCHAR(500) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},
    
    init_lieu: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Lieu(
            id_lieu INTEGER PRIMARY KEY AUTO_INCREMENT,
            adresse VARCHAR(250) NOT NULL,
            ville VARCHAR(250) NOT NULL,
            postcode VARCHAR(50) NOT NULL,
            pays VARCHAR(100) NOT NULL
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_organisation: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Organisation(
            siret INTEGER PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            adresse INTEGER NOT NULL,
            type VARCHAR(500) NOT NULL,
            state VARCHAR(250) NOT NULL,
            FOREIGN KEY (state) REFERENCES State(state_value),
            FOREIGN KEY (adresse) REFERENCES Lieu(id_lieu),
            FOREIGN KEY (type) REFERENCES Type_Organisation(name)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_recrut_org: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Recruteur_Organisation(
            recruteur INTEGER NOT NULL,
            organisation_siret INTEGER NOT NULL,
            FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur),
            FOREIGN KEY (organisation_siret) REFERENCES Organisation(siret),
            PRIMARY KEY (recruteur, organisation_siret)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},
    init_type_metier: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Type_metier(
            type VARCHAR(500) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_status_poste: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Statuts_poste(
            statuts VARCHAR(150) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},
    
    init_fiche_poste: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Fiche_poste(
            id_fiche_poste INTEGER PRIMARY KEY AUTO_INCREMENT,
            intitule VARCHAR(300) NOT NULL,
            rythme_travail FLOAT NOT NULL,
            salaire_min FLOAT NOT NULL,
            salaire_max FLOAT NOT NULL,
            description TEXT,
            statuts_poste VARCHAR(150) NOT NULL,
            lieu INTEGER NOT NULL,
            recruteur INTEGER NOT NULL,
            responsable_hierarchique VARCHAR(150) NOT NULL,
            FOREIGN KEY (statuts_poste) REFERENCES Statuts_poste(statuts),
            FOREIGN KEY (lieu) REFERENCES Lieu(id_lieu),
            FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur),
            CHECK (salaire_min < salaire_max)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},

    init_etat_offre: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS Etat_offre(
            etat VARCHAR(50) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });},

    init_offre: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS Offre(
            id_offre INTEGER PRIMARY KEY AUTO_INCREMENT,
            expiration DATETIME NOT NULL,
            indications TEXT,
            etat VARCHAR(50) NOT NULL,
            FOREIGN KEY (etat) REFERENCES Etat_offre(etat)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },


    init_offre_fiche_poste: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS Offre_Ficheposte(
            id_offre INTEGER NOT NULL,
            id_fiche_poste INTEGER NOT NULL,
            PRIMARY KEY (id_offre, id_fiche_poste),
            FOREIGN KEY (id_offre) REFERENCES Offre(id_offre),
            FOREIGN KEY (id_fiche_poste) REFERENCES Fiche_poste(id_fiche_poste)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },
    init_candidature: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS Candidature(
            id_candidature INTEGER PRIMARY KEY AUTO_INCREMENT,
            date_candidature DATETIME NOT NULL,
            offre INTEGER NOT NULL,
            candidat INTEGER NOT NULL,
            state VARCHAR(250) NOT NULL,
            FOREIGN KEY (state) REFERENCES State(state_value),
            FOREIGN KEY (offre) REFERENCES Offre(id_offre),
            FOREIGN KEY (candidat) REFERENCES Utilisateur(id_utilisateur)
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },

    init_type_pieces_dossier: function (callback) {

        sql = `
        CREATE TABLE IF NOT EXISTS Type_pieces_dossier(
            type_piece VARCHAR(250) PRIMARY KEY
        );`
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },

    init_piece_dossier: function (callback) {
        sql = `
        CREATE TABLE IF NOT EXISTS Pieces_dossier(
            id_piece INTEGER PRIMARY KEY AUTO_INCREMENT,
            type_piece VARCHAR(250) NOT NULL,
            candidature INTEGER NOT NULL,
            FOREIGN KEY (type_piece) REFERENCES Type_pieces_dossier(type_piece),
            FOREIGN KEY (candidature) REFERENCES Candidature(id_candidature)
        );`;        
    db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results);
        });
    },


    drop_database: function (callback) {
        const sql = "DROP TABLE Pieces_dossier; DROP TABLE Type_pieces_dossier; DROP TABLE Candidature; DROP TABLE Offre_Ficheposte; DROP TABLE Offre; DROP TABLE Etat_offre; DROP TABLE Fiche_poste; DROP TABLE Statuts_poste; DROP TABLE Type_metier; DROP TABLE Recruteur_Organisation; DROP TABLE Organisation; DROP TABLE Lieu; DROP TABLE Type_Organisation; DROP TABLE Utilisateur_Roles; DROP TABLE Utilisateur; DROP TABLE State; DROP TABLE Type_utilisateur;";
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results[0]);
        });
    },

    fill_database: function (callback) {
        const sql = "";
        db.query(sql, function (err, results) {
            if (err) callback(err, null);
            else callback(null, results[0]);
        });
    },

}
