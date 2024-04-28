const express = require('express');
const router = express.Router();
const userModel = require('../model/user.js');
const session = require('../utils/session.js');
const {body, validationResult} = require('express-validator');
const sendMail = require('../utils/mail.js');

router.get('/login', function (req, res, next) {
    const session = req.session;
    if (session.usermail) {
        res.redirect("/offers/all");
    } else {
        res.render('login/login', {title: 'Connexion'});
    }
});

router.get('/register', function (req, res, next) {
    const session = req.session;
    if (session.usermail) {
        res.redirect("/offers/all");
        return;
    }
    res.render('login/creation', {
        title: 'Create account'
    });
});


const registerValidate = [
    body('prenom')
        .isAlpha().withMessage('Le prénom ne doit contenir que des lettres')
        .notEmpty().withMessage('Le prénom est requis'),

        body('nom')
        .isAlpha().withMessage('Le nom ne doit contenir que des lettres')
        .notEmpty().withMessage('Le nom est requis'),
    body('email')
        .isEmail().withMessage('L\'email doit être valide')
        .notEmpty().withMessage('L\'email est requis'),
    body('adresse')
        .notEmpty().withMessage('L\'adresse est requise'),
    body('tel')
        .notEmpty().withMessage('Le numéro de téléphone est requis')
        .matches(/^\d{10}$/).withMessage('Le numéro de téléphone doit contenir exactement 10 chiffres'),
    body('pwd')
        .isLength({min: 12})
        .withMessage('Le mot de passe doit contenir au moins 12 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
        .withMessage('Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux et de taille >= 12'),
    body('confirmpswd')
        .custom((value, {req}) => value === req.body.pwd)
        .withMessage('Les mots de passe ne correspondent pas'),
];

router.post('/register',
    registerValidate,
    (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('login/creation', {
            title: 'Inscription',
            error: "Veuillez corriger les erreurs lors de la création du compte:",
            errors: errors.array().reduce((obj, err) => {
                obj[err.path] = err;
                return obj;
            }, {}),
            prenom: req.body.prenom,
            nom: req.body.nom,
            email: req.body.email,
            adresse: req.body.adresse,
            tel: req.body.tel,
            pwd: req.body.pwd,
            confirmpswd: req.body.confirmpswd
        });
    } else {
        userModel.read(req.body.email, function (err, verif) {
            if (verif.length === 0) {
                userModel.create(req.body.nom,
                    req.body.prenom,
                    req.body.pwd,
                    req.body.tel,
                    req.body.email,
                    req.body.adresse, function (err, result) {
                        if (!err) {
                            // Send registration confirmation email
                            sendMail(
                                "Confirmation d'inscription",
                                "Bonjour " + req.body.prenom + ",\n\n" +
                                "La création du compte a été effectuée avec succès.\n\n" +
                                "Une agréable journée à vous,\n",
                                req.body.email);

                            res.redirect("/login/login");
                        }

                    });
            } else {
                res.render(
                    'login/creation', {
                        title: 'Inscription',
                        error: 'Cette adresse mail est déjà utilisée',
                        prenom: req.body.prenom,
                        nom: req.body.nom,
                        email: req.body.email,
                        adresse: req.body.adresse,
                        tel: req.body.tel,
                        pwd: req.body.pwd,
                        confirmpswd: req.body.confirmpswd
                    });
            }
        });
    }

});

router.post('/login', function (req, res, next) {
    userModel.areValid(req.body.email, req.body.pwd, function (err, verif) {
        if (verif) {
            userModel.read(req.body.email, function (err, user) {
                session.createSession(
                    req.session, req.body.email, user[0].type, user[0]
                );
                res.redirect("/offers/all");
            });
        } else {
            res.render('login/login', {title: 'Connexion', error: 'information de connexion invalide.'});
        }
    });
});

/* Déconexion */
router.get('/logout', (req, res) => {
    session.deleteSession(req.session);
    res.redirect('/');
});

module.exports = router;