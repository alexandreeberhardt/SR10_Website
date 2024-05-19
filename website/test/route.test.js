const request = require("supertest");
const app = require("../app");

  // =============================
  // TEST DES ROUTES DE L'API
  // =============================


describe("Test the root path", () => {
  // équivalent à la route /login/login
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });


  // =============================
  // TEST DES ROUTES DE L'AUTH 
  // =============================

  test("It should response the GET method", (done) => {
    request(app)
      .get("/login/login")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the GET method", (done) => {
    request(app)
      .get("/login/logout")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the GET method", (done) => {
    request(app)
      .get("/login/register")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });


  // =============================
  // TEST DES ROUTES DES USERS 
  // =============================



  // =============================
  // TEST DES ROUTES DE RECRUTEURS 
  // =============================



  // =============================
  // TEST DES ROUTES DE ADMIN 
  // =============================



});
