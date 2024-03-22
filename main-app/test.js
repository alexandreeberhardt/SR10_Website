const init = require('./model/initStructure');
const config = require('./config.js');


    init.init_database(function (err, res) {
        if (err) {
            console.log(err)
        } else {
            expect(res.length).toBe(true);
        }
    }
);






