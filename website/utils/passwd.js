const bcrypt = require("bcrypt")



module.exports = {
    generateHash: function (plaintextPassword, callback) {
        bcrypt.hash(plaintextPassword, 10, function (err, hash) {
            callback(hash);
        });
    },

    comparePassword: function (plaintextPassword, hash, callback) {
        bcrypt.compare(plaintextPassword, hash, function (err, result) {
            if (result)
                callback(true);
            else callback(false);
        });
    },
};

