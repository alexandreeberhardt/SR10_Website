CREATE TABLE IF NOT EXISTS Type_utilisateur(
    type_utilisateur VARCHAR(250) PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS Utilisateur(
    id_utilisateur INTEGER PRIMARY KEY,
    email VARCHAR(250) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    tel VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    type_utilisateur VARCHAR(250) NOT NULL,
    FOREIGN KEY (type_utilisateur) REFERENCES Type_utilisateur(type_utilisateur)
);

CREATE TABLE IF NOT EXISTS Type_Organisation(
    name VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Lieu(
    id_lieu INTEGER PRIMARY KEY,
    adresse  VARCHAR(250) NOT NULL,
    ville  VARCHAR(250) NOT NULL,
    postcode  VARCHAR(50) NOT NULL,
    pays VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS Type_metier(
    type VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Statuts_poste(
    id_statuts INTEGER PRIMARY KEY,
    statuts VARCHAR(150) NOT NULL,
    responsable_hierarchique VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS Fiche_poste(
    id_fiche_poste INTEGER PRIMARY KEY,
    intitule VARCHAR(300) NOT NULL,
    rythme_travail FLOAT NOT NULL,
    salaire_min FLOAT NOT NULL,
    salaire_max FLOAT NOT NULL, 
    description TEXT,
    statuts_poste INTEGER NOT NULL, 
    lieu INTEGER NOT NULL, 
    recruteur INTEGER NOT NULL, 
    FOREIGN KEY (statuts_poste) REFERENCES Statuts_poste(id_statuts),
    FOREIGN KEY (lieu) REFERENCES Lieu(id_lieu),
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur),
    CHECK (salaire_min < salaire_max)
);


CREATE TABLE IF NOT EXISTS Etat_offre(
    etat VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Offre(
    id_offre INTEGER PRIMARY KEY,
    expiration TIMESTAMP WITH TIME ZONE NOT NULL,
    indications TEXT,
    etat VARCHAR(50) NOT NULL,
    FOREIGN KEY (etat) REFERENCES Etat_offre(etat)
);

CREATE TABLE IF NOT EXISTS Offre_Ficheposte(
    id_offre INTEGER NOT NULL,
    id_fiche_poste INTEGER NOT NULL,
    PRIMARY KEY (id_offre, id_fiche_poste),
    FOREIGN KEY (id_offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (id_fiche_poste) REFERENCES Fiche_poste(id_fiche_poste)
);

CREATE TABLE IF NOT EXISTS Candidature(
    id_candidature INTEGER PRIMARY KEY,
    date_candidature TIMESTAMP WITH TIME ZONE NOT NULL,
    offre INTEGER NOT NULL, 
    candidat INTEGER NOT NULL, 
    FOREIGN KEY (offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (candidat) REFERENCES Utilisateur(id_utilisateur)
);


CREATE TABLE IF NOT EXISTS Type_pieces_dossier(
    type_piece VARCHAR(250) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Pieces_dossier(
    id_piece INTEGER PRIMARY KEY,
    type_piece VARCHAR(250) NOT NULL, 
    candidature INTEGER NOT NULL, 
    FOREIGN KEY (type_piece) REFERENCES Type_pieces_dossier(type_piece),
    FOREIGN KEY (candidature) REFERENCES Candidature(id_candidature)
);




CREATE TABLE IF NOT EXISTS Type_Organisation(
    name VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Lieu(
    id_lieu INTEGER PRIMARY KEY,
    adresse  VARCHAR(250) NOT NULL,
    ville  VARCHAR(250) NOT NULL,
    postcode  VARCHAR(50) NOT NULL,
    pays VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS Type_metier(
    type VARCHAR(500) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Statuts_poste(
    id_statuts INTEGER PRIMARY KEY,
    statuts VARCHAR(150) NOT NULL,
    responsable_hierarchique VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS Fiche_poste(
    id_fiche_poste INTEGER PRIMARY KEY,
    intitule VARCHAR(300) NOT NULL,
    rythme_travail FLOAT NOT NULL,
    salaire_min FLOAT NOT NULL,
    salaire_max FLOAT NOT NULL, 
    description TEXT,
    statuts_poste INTEGER NOT NULL, 
    lieu INTEGER NOT NULL, 
    recruteur INTEGER NOT NULL, 
    FOREIGN KEY (statuts_poste) REFERENCES Statuts_poste(id_statuts),
    FOREIGN KEY (lieu) REFERENCES Lieu(id_lieu),
    FOREIGN KEY (recruteur) REFERENCES Utilisateur(id_utilisateur)
);


CREATE TABLE IF NOT EXISTS Etat_offre(
    etat VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Offre(
    id_offre INTEGER PRIMARY KEY,
    expiration TIMESTAMP WITH TIME ZONE NOT NULL,
    indications TEXT,
    etat VARCHAR(50) NOT NULL,
    FOREIGN KEY (etat) REFERENCES Etat_offre(etat)
);

CREATE TABLE IF NOT EXISTS Offre_Ficheposte(
    id_offre INTEGER NOT NULL,
    id_fiche_poste INTEGER NOT NULL,
    PRIMARY KEY (id_offre, id_fiche_poste),
    FOREIGN KEY (id_offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (id_fiche_poste) REFERENCES Fiche_poste(id_fiche_poste)
);

CREATE TABLE IF NOT EXISTS Candidature(
    id_candidature INTEGER PRIMARY KEY,
    date_candidature TIMESTAMP WITH TIME ZONE NOT NULL,
    offre INTEGER NOT NULL, 
    candidat INTEGER NOT NULL, 
    FOREIGN KEY (offre) REFERENCES Offre(id_offre),
    FOREIGN KEY (candidat) REFERENCES Utilisateur(id_utilisateur)
);


CREATE TABLE IF NOT EXISTS Type_pieces_dossier(
    type_piece VARCHAR(250) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Pieces_dossier(
    id_piece INTEGER PRIMARY KEY,
    type_piece VARCHAR(250) NOT NULL, 
    candidature INTEGER NOT NULL, 
    FOREIGN KEY (type_piece) REFERENCES Type_pieces_dossier(type_piece),
    FOREIGN KEY (candidature) REFERENCES Candidature(id_candidature)
);


