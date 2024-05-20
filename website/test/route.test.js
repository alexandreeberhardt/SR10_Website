const request = require("supertest");
const app = require("../app");
require("dotenv").config();

// =============================
// TEST DES ROUTES DE L'API
// =============================



// =============================
// TEST DES ROUTES DE L'AUTH
// =============================

describe("Test auth routes", () => {
  test("It should respond with 200 for GET /login/login", (done) => {
    request(app)
      .get("/login/login")
      .expect(200, done);
  });

  test("It should respond with 302 for GET /login/logout", (done) => {
    // il faut être connecté pour se déconnecter
    request(app)
      .get("/login/logout")
      .expect(302, done);
  });

  test("It should respond with 200 for GET /login/register", (done) => {
    request(app)
      .get("/login/register")
      .expect(200, done);
  });
});

// =============================
// TEST DES ROUTES DES USERS
// =============================

// Non connecté

describe("Test users routes not logged in ", () => {
  test("It should respond with 302 for GET /users/account not logged in", (done) => {
    request(app)
      .get("/users/account")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /users/candidatures not logged in", (done) => {
    request(app)
      .get("/users/candidatures")
      .expect(302, done);
  });

});

// Connecté
describe("Test users routes logged in ", () => {
  test("all offers logged in", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_USER, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                    .get("/users/account")
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
  });


  test("all offers logged in", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_USER, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                    .get("/users/candidatures")
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
  });

});


// =============================
// TEST DES ROUTES DE RECRUTEURS
// =============================

// Non connecté

describe("Test recruteurs routes not logged in ", () => {
  test("It should respond with 302 for GET /recruteur/account_recruteur not logged in", (done) => {
    request(app)
      .get("/recruteur/account_recruteur")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /recruteur/visualisation_offre not logged in" , (done) => {
    request(app)
      .get("/recruteur/visualisation_offre")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /recruteur/home_recruteur not logged in", (done) => {
    request(app)
      .get("/recruteur/home_recruteur")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /recruteur/candidatures not logged in", (done) => {
    request(app)
      .get("/recruteur/candidatures")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /recruteur/quit_org not logged in", (done) => {
    request(app)
      .get("/recruteur/quit_org")
      .expect(302, done);
  });

  test("It should respond with 302 for POST /recruteur/quit_org not logged in", (done) => {
    request(app)
      .post("/recruteur/quit_org")
      .send({Type: 123456789, id_utilisateur: 2})
      .expect(302, done);
  });

});


// connecté 

describe("route /recruteur/visualisation_offre GET ", () => {
  test("all offers logged in", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_RECRUTEUR, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                    .get("/recruteur/visualisation_offre")
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
  });

  test("route /recruteur/home_recruteur GET", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_RECRUTEUR, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                    .get("/recruteur/home_recruteur")
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
  });

  test("route /recruteur/candidatures GET", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_RECRUTEUR, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                    .get("/recruteur/candidatures")
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
});


        test("route /recruteur/quit_org GET", done => {
          const agent = request.agent(app); // Create an agent to maintain the session
      
          // Perform a login request to authenticate the user
          agent
              .post("/login/login")
              .send({email: process.env.TEST_RECRUTEUR, password: process.env.TEST_USER_PASSWD})
              .end((loginErr, loginRes) => {
                  if (loginErr) {
                      done(loginErr);
                  } else {
                      // If login is successful, make the request to the protected route
                      agent
                          .get("/recruteur/quit_org")
                          .then(response => {
                              expect(response.statusCode).toBe(200);
                              agent
                                  .get("/login/logout")
                                  .then(logoutResponse => {
                                      expect(logoutResponse.statusCode).toBe(302);
                                      done();
                                  })
                                  .catch(logoutErr => {
                                      done(logoutErr);
                                  });
                          })
                          .catch(routeErr => {
                              done(routeErr);
                          });
                  }
              });
  });

  test("route /recruteur/quit_org POST", done => {
    const agent = request.agent(app); // Create an agent to maintain the session

    // Perform a login request to authenticate the user
    agent
        .post("/login/login")
        .send({email: process.env.TEST_RECRUTEUR, password: process.env.TEST_USER_PASSWD})
        .end((loginErr, loginRes) => {
            if (loginErr) {
                done(loginErr);
            } else {
                // If login is successful, make the request to the protected route
                agent
                  .post("/recruteur/quit_org")
                  .send({Type: 123456789, id_utilisateur: 2})
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        agent
                            .get("/login/logout")
                            .then(logoutResponse => {
                                expect(logoutResponse.statusCode).toBe(302);
                                done();
                            })
                            .catch(logoutErr => {
                                done(logoutErr);
                            });
                    })
                    .catch(routeErr => {
                        done(routeErr);
                    });
            }
        });
  });
  

});



// =============================
// TEST DES ROUTES DE OFFRES
// =============================

describe("Test offers routes not logged in ", () => {
  test("It should respond with 302 for GET /offres/offer not logged in", (done) => {
    request(app)
      .get("/offres/offer")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /offres/1 not logged in", (done) => {
    request(app)
      .get("/offres/1")
      .expect(302, done);
  });

  test("It should respond with 302 for GET /offres/1 not logged in", (done) => {
    request(app)
      .post("/offres/1")
      .send({id_offre: 5, id_utilisateur: 3})
      .expect(302, done);
  });


});



// =============================
// TEST DES ROUTES DE ADMIN
// =============================

// Non connectés 
