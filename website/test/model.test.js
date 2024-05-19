const DB = require("../model/db.js");
const userModel = require("../model/user.js");


describe("Model Tests", () => {

  beforeAll(() => {
    // des instructions à exécuter avant le lancement des tests
  });

  afterAll((done) => {
    function callback(err) {
      if (err) done(err);
      else done();
    }
    DB.end(callback);
  });

  test("read user", () => {
      res = null;
      function cbRead(resultat) {
        console.log("RESULTAT : ",resultat)
      res = resultat[0].nom;
      expect(res).toBe("test");
    }
    userModel.read("test@test.fr", cbRead);
  });



  //test("read user", () => {
  //    nom = null;
  //  function cbRead(resultat) {
  //    nom = resultat[0].nom;
  //    expect(nom).toBe("test");
  //  }
  //  userModel.read("test@test.fr", cbRead);
  //});
  


});
