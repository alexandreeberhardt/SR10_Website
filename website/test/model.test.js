const DB = require("../model/db.js");
const model = require("../model/user.js");
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
  test("read user", (done) => {
    nom = null;
    function cbRead(resultat) {
      nom = resultat[0].nom;
      try {
        expect(nom).toBe("test");
      done();
      }
      catch{
        done(error);
      }
    }
    model.read("test@test.fr", cbRead);
  });
});
