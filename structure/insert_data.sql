INSERT INTO Type_utilisateur (type_utilisateur) VALUES 
('Administrateur'),
('Recruteur'),
('Candidat');

INSERT INTO State_demande (state_value) VALUES 
('En attente'),
('Approuvée'),
('Rejetée');

INSERT INTO Type_Organisation (name) VALUES 
('Technologie'),
('Éducation'),
('Santé');

INSERT INTO Type_metier (type) VALUES 
('Ingénierie'),
('Enseignement'),
('Médecine');

INSERT INTO Statuts_poste (statuts) VALUES 
('ETAM'),
('Cadre'),
('Fonctionnaire');

INSERT INTO State_offre (etat) VALUES 
('Active'),
('Inactive'),
('Expirée');

INSERT INTO Type_pieces_dossier (type_piece) VALUES 
('CV'),
('Lettre de motivation'),
('Certificat de travail');

INSERT INTO Lieu (adresse, ville, postcode, pays) VALUES
('123 Rue de Paris', 'Paris', '75001', 'France'),
('456 Avenue des Champs-Élysées', 'Paris', '75008', 'France'),
('789 Rue de Lyon', 'Lyon', '69000', 'France'),
('101 Rue de Marseille', 'Marseille', '13000', 'France'),
('202 Avenue de Bordeaux', 'Bordeaux', '33000', 'France'),
('303 Rue de Toulouse', 'Toulouse', '31000', 'France'),
('404 Boulevard de Grenoble', 'Grenoble', '38000', 'France'),
('505 Avenue de Nice', 'Nice', '06000', 'France'),
('606 Rue de Strasbourg', 'Strasbourg', '67000', 'France'),
('707 Rue de Lille', 'Lille', '59000', 'France');

INSERT INTO Organisation (siret, name, adresse, type, state) VALUES
(123456789, 'Tech Innov', 1, 'Technologie', 'En attente'),
(987654321, 'Edu Future', 2, 'Éducation', 'Approuvée'),
(112233445, 'Health Plus', 3, 'Santé', 'Rejetée'),
(556677889, 'Tech Global', 4, 'Technologie', 'En attente'),
(998877665, 'Learning Hub', 5, 'Éducation', 'Approuvée'),
(443322110, 'MediCare', 6, 'Santé', 'Rejetée'),
(665544332, 'Tech Advance', 7, 'Technologie', 'En attente'),
(221100998, 'School of Tomorrow', 8, 'Éducation', 'Approuvée'),
(334455667, 'Health Innovations', 9, 'Santé', 'Rejetée'),
(778899001, 'Tech Solutions', 10, 'Technologie', 'En attente');

INSERT INTO Utilisateur (email, nom, prenom, tel, password, is_active) VALUES
('user1@example.com', 'Nom1', 'Prenom1', '0123456789', 'password1', TRUE),
('user2@example.com', 'Nom2', 'Prenom2', '0123456790', 'password2', TRUE),
('user3@example.com', 'Nom3', 'Prenom3', '0123456791', 'password3', TRUE),
('user4@example.com', 'Nom4', 'Prenom4', '0123456792', 'password4', TRUE),
('user5@example.com', 'Nom5', 'Prenom5', '0123456793', 'password5', TRUE),
('user6@example.com', 'Nom6', 'Prenom6', '0123456794', 'password6', TRUE),
('user7@example.com', 'Nom7', 'Prenom7', '0123456795', 'password7', TRUE),
('user8@example.com', 'Nom8', 'Prenom8', '0123456796', 'password8', TRUE),
('user9@example.com', 'Nom9', 'Prenom9', '0123456797', 'password9', TRUE),
('user10@example.com', 'Nom10', 'Prenom10', '0123456798', 'password10', TRUE);

INSERT INTO Utilisateur_Roles (id_utilisateur, type_utilisateur, state_user) VALUES
(1, 'Administrateur', 'En attente'),
(2, 'Recruteur', 'Approuvée'),
(3, 'Candidat', 'Rejetée'),
(4, 'Recruteur', 'En attente'),
(5, 'Candidat', 'Approuvée'),
(6, 'Recruteur', 'Rejetée'),
(7, 'Candidat', 'En attente'),
(8, 'Recruteur', 'Approuvée'),
(9, 'Candidat', 'Rejetée'),
(10, 'Recruteur', 'En attente');

INSERT INTO Recruteur_Organisation (recruteur, organisation_siret, state) VALUES
(2, 123456789, 'En attente'),
(4, 987654321, 'Approuvée'),
(6, 112233445, 'Rejetée'),
(8, 556677889, 'En attente'),
(10, 998877665, 'Approuvée');

INSERT INTO Fiche_poste (intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, lieu, recruteur, is_active, responsable_hierarchique) VALUES
('Développeur Full Stack', 40, 35000, 45000, 'Développement de solutions web complètes', 'ETAM', 1, 2, TRUE, 'Nom Responsable 1'),
('Enseignant Mathématiques', 35, 25000, 35000, 'Enseignement des mathématiques au lycée', 'Fonctionnaire', 2, 4, TRUE, 'Nom Responsable 2'),
('Infirmier', 40, 22000, 32000, 'Soins infirmiers en hôpital', 'Cadre', 3, 6, TRUE, 'Nom Responsable 3'),
('Ingénieur Systèmes', 40, 40000, 50000, 'Gestion et optimisation des systèmes informatiques', 'Cadre', 4, 8, TRUE, 'Nom Responsable 4'),
('Professeur de Français', 35, 23000, 33000, 'Enseignement du français au collège', 'Fonctionnaire', 5, 10, TRUE, 'Nom Responsable 5');

INSERT INTO Offre (expiration, indications, fiche_poste, etat) VALUES
('2024-12-31 23:59:59', 'Indications spécifiques 1', 1, 'Active'),
('2024-06-30 23:59:59', 'Indications spécifiques 2', 2, 'Inactive'),
('2024-09-30 23:59:59', 'Indications spécifiques 3', 3, 'Expirée'),
('2024-03-31 23:59:59', 'Indications spécifiques 4', 4, 'Active'),
('2024-11-30 23:59:59', 'Indications spécifiques 5', 5, 'Inactive');

INSERT INTO Candidature (date_candidature, last_modified, offre, candidat, state) VALUES
('2024-01-01 00:00:00', '2024-03-01 00:00:00', 1, 3, 'En attente'),
('2024-02-01 00:00:00', '2024-03-02 00:00:00', 2, 5, 'Approuvée'),
('2024-03-01 00:00:00', '2024-03-03 00:00:00', 3, 7, 'Rejetée'),
('2024-04-01 00:00:00', '2024-03-04 00:00:00', 4, 9, 'En attente'),
('2024-05-01 00:00:00', '2024-03-05 00:00:00', 5, 1, 'Approuvée');

INSERT INTO Pieces_dossier (type_piece, candidature) VALUES
('CV', 1),
('Lettre de motivation', 1),
('Certificat de travail', 1),
('CV', 2),
('Lettre de motivation', 2),
('Certificat de travail', 2),
('CV', 3),
('Lettre de motivation', 3),
('Certificat de travail', 3),
('CV', 4);
