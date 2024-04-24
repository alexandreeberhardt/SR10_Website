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
  test("read user", () => {
    nom = null;
    function cbRead(resultat) {
      nom = resultat[0].nom;
      expect(nom).toBe("test");
    }
    model.read("test@test.fr", cbRead);
  });
});
