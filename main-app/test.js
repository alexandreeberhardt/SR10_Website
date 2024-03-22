const init = require('./model/initStructure');
const config = require('./config.js');


init.init_type_utilisateur(function (err, res) {
        if (err) {
            console.log(err)
        } else {
            expect(res.length).toBe(true);
        }
    }
);
init.init_state(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_user(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_user_role(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_type_organisation(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_lieu(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_organisation(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_recrut_org(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);


init.init_recrut_org(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_type_metier(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_fiche_poste(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_etat_offre(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);


init.init_offre(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_offre_fiche_poste(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_candidature(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_type_pieces_dossier(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);
init.init_piece_dossier(function (err, res) {
    if (err) {
        console.log(err)
    } else {
        expect(res.length).toBe(true);
    }
}
);




