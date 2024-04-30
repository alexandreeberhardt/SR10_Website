const sessions = require("express-session");
require('dotenv').config();

module.exports = {
    init: () => {
        return sessions({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            cookie: {maxAge: 3600 * 1000}, // 1heure
            resave: false,
        });
    },
    createSession: function (session, mail, role, user) {
        session.user = user;
        session.usermail = mail;
        console.log(role)

        if(role == null){
            session.role = "candidat"
        }else{
            session.role = role;
        }
        session.save(function (err) {
            // console.log(err);
        });
        console.log(session)
        return session;
    },

    isConnected: (session, role) => {
        if (!session.usermail) return false;
        return !(role && session.role !== role);
    },

    deleteSession: function (session) {
        session.destroy();
    },
};
