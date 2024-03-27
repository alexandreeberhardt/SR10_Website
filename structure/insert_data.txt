-- Table Type_utilisateur
INSERT INTO Type_utilisateur (type_utilisateur) VALUES 
('Administrateur'),
('Recruteur'),
('Candidat');

-- Table State
INSERT INTO State (state_value) VALUES 
('Actif'),
('Inactif'),
('En attente'),
('Suspendu'),
('Bloqué'),
('Supprimé'),
('Terminé'),
('Validé'),
('Refusé'),
('En cours');

-- Table Utilisateur
INSERT INTO Utilisateur (email, nom, prenom, tel, password) VALUES 
('user1@example.com', 'Doe', 'John', '1234567890', 'password1'),
('user2@example.com', 'Smith', 'Alice', '9876543210', 'password2'),
('user3@example.com', 'Johnson', 'Bob', '5551234567', 'password3'),
('user4@example.com', 'Williams', 'Emily', '9998887776', 'password4'),
('user5@example.com', 'Brown', 'Michael', '1112223334', 'password5'),
('user6@example.com', 'Jones', 'Emma', '4445556665', 'password6'),
('user7@example.com', 'Garcia', 'David', '7778889998', 'password7'),
('user8@example.com', 'Martinez', 'Sophia', '2223334449', 'password8'),
('user9@example.com', 'Hernandez', 'Olivia', '6667778880', 'password9'),
('user10@example.com', 'Young', 'Daniel', '3334445551', 'password10');

-- Table Utilisateur_Roles
INSERT INTO Utilisateur_Roles (id_utilisateur, type_utilisateur, state_user) VALUES 
(1, 'Administrateur', 'Actif'),
(2, 'Recruteur', 'Actif'),
(3, 'Candidat', 'Actif'),
(4, 'Candidat', 'Actif'),
(5, 'Candidat', 'Actif'),
(6, 'Recruteur', 'Actif'),
(7, 'Candidat', 'Actif'),
(8, 'Candidat', 'Actif'),
(9, 'Candidat', 'Actif'),
(10, 'Administrateur', 'Actif');

-- Table Type_Organisation
INSERT INTO Type_Organisation (name) VALUES 
('Startup'),
('PME'),
('Grande Entreprise'),
('Association'),
('Gouvernementale'),
('Non-gouvernementale'),
('Institution Publique'),
('Éducation'),
('Santé'),
('Technologie');

-- Table Lieu
INSERT INTO Lieu (adresse, ville, postcode, pays) VALUES 
('123 Rue de la République', 'Paris', '75001', 'France'),
('456 Avenue des Champs-Élysées', 'Paris', '75008', 'France'),
('789 Boulevard Saint-Germain', 'Paris', '75006', 'France'),
('101 Rue du Faubourg Saint-Honoré', 'Paris', '75008', 'France'),
('234 Avenue de la Grande Armée', 'Paris', '75017', 'France'),
('567 Boulevard Haussmann', 'Paris', '75009', 'France'),
('890 Rue de Rivoli', 'Paris', '75004', 'France'),
('111 Place de la Concorde', 'Paris', '75008', 'France'),
('222 Avenue Montaigne', 'Paris', '75008', 'France'),
('333 Rue Royale', 'Paris', '75008', 'France');

-- Table Organisation
INSERT INTO Organisation (siret, name, adresse, type, state) VALUES 
(12345678901234, 'ABC Startup', 1, 'Startup', 'Actif'),
(23456789012345, 'DEF PME', 2, 'PME', 'Actif'),
(34567890123456, 'GHI Grande Entreprise', 3, 'Grande Entreprise', 'Actif'),
(45678901234567, 'JKL Association', 4, 'Association', 'Actif'),
(56789012345678, 'MNO Gouvernementale', 5, 'Gouvernementale', 'Actif'),
(67890123456789, 'PQR Non-gouvernementale', 6, 'Non-gouvernementale', 'Actif'),
(78901234567890, 'STU Institution Publique', 7, 'Institution Publique', 'Actif'),
(89012345678901, 'VWX Éducation', 8, 'Éducation', 'Actif'),
(90123456789012, 'YZ Santé', 9, 'Santé', 'Actif'),
(12345678901234, 'ABC Technologie', 10, 'Technologie', 'Actif');

-- Table Recruteur_Organisation
INSERT INTO Recruteur_Organisation (recruteur, organisation_siret) VALUES 
(2, 12345678901234),
(3, 23456789012345),
(4, 34567890123456),
(5, 45678901234567),
(6, 56789012345678),
(7, 67890123456789),
(8, 78901234567890),
(9, 89012345678901),
(10, 12345678901234),
(1, 23456789012345);

-- Table Type_metier
INSERT INTO Type_metier (type) VALUES 
('Développeur Web'),
('Ingénieur Logiciel'),
('Designer UI/UX'),
('Chef de Projet Digital'),
('Data Scientist'),
('Analyste Financier'),
('Responsable RH'),
('Consultant en Management'),
('Chargé de Communication'),
('Marketing Digital');

-- Table Statuts_poste
INSERT INTO Statuts_poste (statuts) VALUES 
('CDI'),
('CDD'),
('Stage'),
('Apprentissage'),
('Freelance'),
('Intérim'),
('Temps partiel'),
('Temps plein'),
('Contrat de Mission'),
('Contrat de Professionnalisation');

-- Table Fiche_poste
INSERT INTO Fiche_poste (intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, lieu, recruteur, responsable_hierarchique) VALUES 
('Développeur Web Senior', 35.0, 35000.00, 45000.00, 'Nous recherchons un développeur web senior pour rejoindre notre équipe dynamique.', 'CDI', 1, 2, 'Responsable Technique'),
('Ingénieur Logiciel Java', 40.0, 40000.00, 50000.00, 'Nous recrutons un ingénieur logiciel spécialisé en Java pour un projet innovant.', 'CDI', 2, 3, 'Chef de Projet'),
('UI/UX Designer', 37.5, 30000.00, 40000.00, 'Nous recherchons un designer UI/UX pour concevoir des interfaces utilisateur attrayantes.', 'CDI', 3, 4, 'Directeur Artistique'),
('Chef de Projet Digital', 38.0, 40000.00, 55000.00, 'Nous avons besoin d\'un chef de projet digital pour superviser nos projets en ligne.', 'CDI', 4, 5, 'Directeur Digital'),
('Data Scientist', 40.0, 45000.00, 60000.00, 'Rejoignez notre équipe en tant que data scientist pour travailler sur des projets analytiques avancés.', 'CDI', 5, 6, 'Directeur des Données'),
('Analyste Financier Junior', 35.0, 30000.00, 40000.00, 'Nous cherchons un analyste financier junior pour soutenir notre équipe finance.', 'CDI', 6, 7, 'Responsable Financier'),
('Responsable RH', 40.0, 45000.00, 55000.00, 'Nous recrutons un responsable des ressources humaines pour gérer notre personnel et nos politiques RH.', 'CDI', 7, 8, 'Directeur des Ressources Humaines'),
('Consultant en Management', 35.0, 40000.00, 60000.00, 'Nous recherchons un consultant en management expérimenté pour conseiller nos clients sur des questions stratégiques.', 'CDI', 8, 9, 'Directeur de Consulting'),
('Chargé de Communication', 37.5, 35000.00, 45000.00, 'Rejoignez notre équipe en tant que chargé de communication pour promouvoir notre marque et nos produits.', 'CDI', 9, 10, 'Directeur Marketing'),
('Marketing Digital Specialist', 40.0, 40000.00, 55000.00, 'Nous recherchons un spécialiste du marketing digital pour développer et exécuter nos campagnes de marketing en ligne.', 'CDI', 10, 1, 'Directeur Marketing');

-- Table Etat_offre
INSERT INTO Etat_offre (etat) VALUES 
('Ouvert'),
('Fermé'),
('En Attente'),
('Annulé'),
('Archivé'),
('En Cours'),
('Accepté'),
('Refusé'),
('Suspendu'),
('Clôturé');

-- Table Offre
INSERT INTO Offre (expiration, indications, etat) VALUES 
('2024-04-30 23:59:59', 'Expérience requise : 2 ans minimum.', 'Ouvert'),
('2024-05-15 23:59:59', 'Disponibilité immédiate exigée.', 'Ouvert'),
('2024-06-01 23:59:59', 'Anglais courant requis.', 'Ouvert'),
('2024-06-30 23:59:59', 'Expérience en gestion d\'équipe souhaitée.', 'Ouvert'),
('2024-07-15 23:59:59', 'Connaissances en data science appréciées.', 'Ouvert'),
('2024-08-01 23:59:59', 'Bonne capacité d\'analyse demandée.', 'Ouvert'),
('2024-08-31 23:59:59', 'Maîtrise des outils de communication digitale.', 'Ouvert'),
('2024-09-15 23:59:59', 'Expérience dans le consulting stratégique.', 'Ouvert'),
('2024-10-01 23:59:59', 'Créativité et esprit d\'équipe indispensables.', 'Ouvert'),
('2024-10-31 23:59:59', 'Bonne compréhension du marketing digital.', 'Ouvert');

-- Table Offre_Ficheposte
INSERT INTO Offre_Ficheposte (id_offre, id_fiche_poste) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Table Candidature
INSERT INTO Candidature (date_candidature, offre, candidat, state) VALUES 
('2024-03-20 10:00:00', 1, 3, 'En Attente'),
('2024-03-20 10:15:00', 2, 4, 'En Attente'),
('2024-03-20 10:30:00', 3, 5, 'En Attente'),
('2024-03-20 10:45:00', 4, 6, 'En Attente'),
('2024-03-20 11:00:00', 5, 7, 'En Attente'),
('2024-03-20 11:15:00', 6, 8, 'En Attente'),
('2024-03-20 11:30:00', 7, 9, 'En Attente'),
('2024-03-20 11:45:00', 8, 10, 'En Attente'),
('2024-03-20 12:00:00', 9, 1, 'En Attente'),
('2024-03-20 12:15:00', 10, 2, 'En Attente');

-- Table Type_pieces_dossier
INSERT INTO Type_pieces_dossier (type_piece) VALUES 
('CV'),
('Lettre de Motivation'),
('Références'),
('Diplômes'),
('Certificats'),
('Portfolio'),
('Autres'),
('Attestations'),
('Entretiens'),
('Contrats');

-- Table Pieces_dossier
INSERT INTO Pieces_dossier (type_piece, candidature) VALUES 
('CV', 1),
('CV', 2),
('CV', 3),
('CV', 4),
('CV', 5),
('CV', 6),
('CV', 7),
('CV', 8),
('CV', 9),
('CV', 10);

