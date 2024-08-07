var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
var adminModel = require("../model/admin");

const session = require('../utils/session.js');


router.post('/makeadmin', function (req, res, next) {
    const session = req.session;

    if (session.role != "Administrateur"){
          return res.status(403).send("Accès interdit.");
    }

    const id = session.user.id_utilisateur
    userModel.makeAdmin(id, req.body.reason, function (err, email) {
        if(err){
            res.redirect('/users/account');
        }
        else if (email) {
                sendMail(
                    "Demande d'élévation de privilège Recr'UT ",
                    "Bonjour " + session.user.prenom + ",\n\n" +
                    "Votre demande pour devenir administrateur a bien été prise en compte.\n\n" +
                    "Vous recevrez une réponse sous peu\n\n" +
                    "Si vous n'êtes pas à l'origine de cette action veuillez contacter le support. \n\n"+
                    "Une agréable journée à vous,\n\nL'équipe Recr'UT.",
                    session.user.email);
        } 
        res.redirect('/users/account');
    });
});


router.get("/account", function (req, res, next) {
    const session = req.session;
    let info = req.session.user;
    info.role = req.session.role;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }

    adminModel.demandeUsers((err, result1) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return res.status(500).send('Une erreur est survenue lors de la récupération des utilisateurs.');
        }
        adminModel.demandeOrg((result2) => {
            if(!result2) {
                console.error('Erreur lors de la récupération des organisations :', err);
                return res.status(500).send('Une erreur est survenue lors de la récupération des organisations.');    
            }
            const results = {
                "users": result1,
                "org": result2
            };
            res.render("admin/account", { title: "Account Admin", data : results, info : info});
        })

    });
});


router.get('/makeadmin/:id_user/:role', function (req, res) {
    const id_user = req.params.id_user;
    const role = req.params.role;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.demandeUsersbyId(id_user, role, function(err, result) {
        if (err) {
            console.error('Error fetching user details', err);
            return res.status(500).send('Error fetching user details');
        }   
        result = JSON.stringify(result)
        result = JSON.parse(result)
        const final = result[0]

        res.render('admin/makeadmin', 
        { 
            title: "valider une demande d'utilisateur", 
            nom: final.nom, prenom : final.prenom, id : final.id, 
            role:final.role, reason : final.reason
        });
    });
});


router.get('/users', function (req, res) {

    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.getAllUsers(function(err, result) {
        if (err) {
            console.error('Error fetching user details', err);
            return res.status(500).send('Error fetching user details');
        }

    function isIn(array, mail){
        for(let i=0;i<array.length;i++){
            if (array[i].email === mail){
                return true;
            }
        }
        return false
    }

    function getFromArray(array,mail){
        for(let i=0;i<array.length;i++){
            if (array[i].email === mail){
                return array[i];
            }
        }
        return;
    }

        res.render('admin/users', 
        { 
            title: "Gérer les utilisateurs", 
            data : result
        });
    });
});

router.get('/acceptorg/:siret', function (req, res) {
    const id_user = req.params.siret;
    const session = req.session;

    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }

    adminModel.demandeOrgbyId(id_user, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }   
        result = JSON.stringify(result)
        data = JSON.parse(result)[0]

        res.render('admin/acceptorg', 
        { 
            title: "valider une demande d'organisation", 
            result: data
        });
    });
});

router.get('/gestuser/:id', function (req, res) {
    const id_user = req.params.id;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.getAllFromUser(id_user, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }   
        result = JSON.stringify(result)
        data = JSON.parse(result)[0]

        res.render('admin/gestusr', 
        { 
            title: "Gestionnaire d'un utilisateur", 
            result: data
        });
    });
});

router.post('/acceptadmin', function (req, res) {
    const id = req.body.id;
    const role = req.body.role;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.acceptRole(id,role, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        res.redirect('/')
    });
});

router.post('/denyadmin', function (req, res) {
    const id = req.body.id;
    const role = req.body.role;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.denyRole(id,role, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        res.redirect('/')
    });
});

router.post('/acceptorg', function (req, res) {
    const siret = req.body.siret;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.acceptOrg(siret, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        res.redirect('/')
    });
});

router.post('/denyorg', function (req, res) {
    const siret = req.body.siret;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.denyOrg(siret, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        res.redirect('/')
    });
});

router.post('/ban', function (req, res) {
    const id = req.body.id;
    const session = req.session;
    console.log(id)
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.updateUser(0, id, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        adminModel.getAllFromUser(id, function(err, result) {
            if (err) {
                console.error('Error fetching org details', err);
                return res.status(500).send('Error fetching org details');
            }   
            result = JSON.stringify(result)
            data = JSON.parse(result)[0]
    
            res.render('admin/gestusr', 
            { 
                title: "Utilisateur banni", 
                result: data

            });
        });
    });
});




router.post('/unban', function (req, res) {
    const id = req.body.id;
    const session = req.session;
    console.log(id)
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.updateUser(1, id, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }
        adminModel.getAllFromUser(id, function(err, result) {
            if (err) {
                console.error('Error fetching org details', err);
                return res.status(500).send('Error fetching org details');
            }   
            result = JSON.stringify(result)
            data = JSON.parse(result)[0]
    
            res.render('admin/gestusr', 
            { 
                title: "Utilisateur débanni", 
                result: data
                
            });
        });    
    });
});


router.post('/modifytel', function(req,res){
    const id_user = req.body.id_user;
    const new_var = req.body.tel;
    const result = req.body.values;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.modifyUserTel(id_user,new_var,function(err,result){
        if(err){
            console.error('Error updating phone number', err);
            return res.status(500).send('Error updating phone number');
        }
        console.log(id_user,new_var)
        const path = '/admin/gestuser/'+id_user
        res.redirect(path)
    })
});

router.post('/modifyname', function(req,res){
    const id_user = req.body.id_user;
    const new_var = req.body.name;
    const result = req.body.values;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.modifyUserName(id_user,new_var,function(err,result){
        if(err){
            console.error('Error updating phone number', err);
            return res.status(500).send('Error updating phone number');
        }
        console.log(id_user,new_var)
        const path = '/admin/gestuser/'+id_user
        res.redirect(path)
    })
});

router.post('/modifymail', function(req,res){
    const id_user = req.body.id_user;
    const new_var = req.body.email;
    const result = req.body.values;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.modifyUserMail(id_user,new_var,function(err,result){
        if(err){
            console.error('Error updating phone number', err);
            return res.status(500).send('Error updating phone number');
        }
        console.log(id_user,new_var)
        const path = '/admin/gestuser/'+id_user
        res.redirect(path)
    })
});

router.post('/modifyprenom', function(req,res){
    const id_user = req.body.id_user;
    const new_var = req.body.prenom;
    const result = req.body.values;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.modifyUserSurname(id_user,new_var,function(err,result){
        if(err){
            console.error('Error updating phone number', err);
            return res.status(500).send('Error updating phone number');
        }
        console.log(id_user,new_var)
        const path = '/admin/gestuser/'+id_user
        res.redirect(path)
    })
});



module.exports = router;