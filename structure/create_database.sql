CREATE TABLE IF NOT EXISTS Type_utilisateur(
    type_utilisateur VARCHAR(250) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS State_demande(
    state_value VARCHAR(250) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Type_Organisation(
    name VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Type_metier(
    type VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Statuts_poste(
    statuts VARCHAR(150) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS State_offre(
    etat VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Type_pieces_dossier(
    type_piece VARCHAR(250) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Lieu(
    id_lieu INTEGER PRIMARY KEY AUTO_INCREMENT,
    adresse  VARCHAR(250) NOT NULL,
    ville  VARCHAR(250) NOT NULL,
    postcode  VARCHAR(50) NOT NULL,
    pays VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Organisation(
    siret INTEGER PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    adresse INTEGER NOT NULL,
    type VARCHAR(500) NOT NULL,
    state VARCHAR(250) NOT NULL,
    FOREIGN KEY (state) REFERENCES State_demande(state_value),
    FOREIGN KEY (adresse) REFERENCES Lieu(id_lieu),
    FOREIGN KEY (type) REFERENCES Type_Organisation(name)
);

CREATE TABLE IF NOT EXISTS Utilisateur(
    id_utilisateur INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(250) UNIQUE NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    tel VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Utilisateur_Roles(
    id_utilisateur INTEGER NOT NULL AUTO_INCREMENT,
    type_utilisateur VARCHAR(250) NOT NULL,
    state_user VARCHAR(250) NOT NULL,
    organisation INTEGER,
    FOREIGN KEY (state_user) REFERENCES State_demande(state_value),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (type_utilisateur) REFERENCES Type_utilisateur(type_utilisateur),
    FOREIGN KEY (organisation) REFERENCES Organisation(siret),
    PRIMARY KEY (id_utilisateur, type_utilisateur)
);



CREATE TABLE IF NOT EXISTS Recruteur_Organisation(
    recruteur INTEGER NOT NULL,
    organisation_siret INTEGER NOT NULL,
    state VARCHAR(250) NOT NULL,
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (organisation_siret) REFERENCES Organisation(siret),
    FOREIGN KEY (state) REFERENCES State_demande(state_value),
    PRIMARY KEY (recruteur, organisation_siret)
);


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
    is_active BOOLEAN NOT NULL,
    responsable_hierarchique VARCHAR(150) NOT NULL,
    FOREIGN KEY (statuts_poste) REFERENCES Statuts_poste(statuts),
    FOREIGN KEY (lieu) REFERENCES Lieu(id_lieu),
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur),
    CHECK (salaire_min < salaire_max)
);

CREATE TABLE IF NOT EXISTS Offre(
    id_offre INTEGER PRIMARY KEY AUTO_INCREMENT,
    expiration DATETIME NOT NULL,
    indications TEXT,
    fiche_poste INTEGER NOT NULL,
    etat VARCHAR(50) NOT NULL,
    FOREIGN KEY (etat) REFERENCES State_offre(etat),
    FOREIGN KEY (fiche_poste) REFERENCES Fiche_poste(id_fiche_poste)

);

CREATE TABLE IF NOT EXISTS Candidature(
    id_candidature INTEGER PRIMARY KEY AUTO_INCREMENT,
    date_candidature DATETIME NOT NULL,
    last_modified DATETIME NOT NULL,
    offre INTEGER NOT NULL, 
    candidat INTEGER NOT NULL, 
    state VARCHAR(250) NOT NULL,
    FOREIGN KEY (state) REFERENCES State_demande(state_value),
    FOREIGN KEY (offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (candidat) REFERENCES Utilisateur(id_utilisateur)
);


CREATE TABLE IF NOT EXISTS Pieces_dossier(
    id_piece INTEGER PRIMARY KEY AUTO_INCREMENT,
    type_piece VARCHAR(250) NOT NULL, 
    candidature INTEGER NOT NULL, 
    FOREIGN KEY (type_piece) REFERENCES Type_pieces_dossier(type_piece),
    FOREIGN KEY (candidature) REFERENCES Candidature(id_candidature)
);

CREATE TABLE IF NOT EXISTS Offre_Organisation(
    offre INTEGER NOT NULL,
    org INTEGER NOT NULL, 
    FOREIGN KEY (offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (org) REFERENCES Organisation(siret)
);

