const db = require("../model/db.js");
const recruteur = require("../model/recruteur.js");

jest.mock("../model/db.js");

describe("Recruteur Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("readCandidatures", () => {
    it("should return candidatures for the given status", (done) => {
      const mockResults = [
        { date_candidature: "2023-05-01", nom: "Doe", prenom: "John", intitule: "Developer" },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.readCandidatures("Pending", (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.readCandidatures("Pending", () => {});
      }).toThrow("Database error");
    });
  });

  describe("readNewRecruteur", () => {
    it("should return details for the given offer ID", (done) => {
      const mockResults = [{ id_offre: 1, intitule: "Developer" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.readNewRecruteur(1, (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.readNewRecruteur(1, () => {});
      }).toThrow("Database error");
    });
  });

  describe("readAllOffres", () => {
    it("should return all offers for the given recruiter ID", (done) => {
      const mockResults = [
        { id_fiche_poste: 1, intitule: "Developer", rythme_travail: "Full-time", salaire_min: 40000, salaire_max: 60000, statuts_poste: "Open", id_offre: 1 },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.readAllOffres(1, (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.readAllOffres(1, () => {});
      }).toThrow("Database error");
    });
  });

  describe("getAllCandidats", () => {
    it("should return all candidates for the given offer ID", (done) => {
      const mockResults = [
        { id_utilisateur: 1, email: "john.doe@example.com", nom: "Doe", prenom: "John", tel: "1234567890", is_active: 1, offre: 1, state: "En attente", id_candidature: 1 },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getAllCandidats(1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.getAllCandidats(1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("getAllCandidatsVerified", () => {
    it("should return all verified candidates for the given offer ID", (done) => {
      const mockResults = [
        { id_utilisateur: 2, email: "jane.doe@example.com", nom: "Doe", prenom: "Jane", tel: "0987654321", is_active: 1, offre: 1, state: "Verified", id_candidature: 2 },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getAllCandidatsVerified(1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.getAllCandidatsVerified(1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("readAllRequests", () => {
    it("should return all requests for the given state and organisation", (done) => {
      const mockResults = [
        { Type: "Recruteur", Demandeur: "John Doe", "Status de la demande": "Pending", organisation: "Org1" },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.readAllRequests("Pending", "Org1", (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.readAllRequests("Pending", "Org1", () => {});
      }).toThrow("Database error");
    });
  });

  describe("getOrgForRecruteur", () => {
    it("should return organisation details for the given recruiter ID", (done) => {
      const mockResults = [{ siret: "12345", name: "Org1" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getOrgForRecruteur(1, (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.getOrgForRecruteur(1, () => {});
      }).toThrow("Database error");
    });
  });

  describe("getNewApplicantsRecruters", () => {
    it("should return new applicants for the given recruiter ID", (done) => {
      const mockResults = [{ siret: "12345", name: "Org1" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getNewApplicantsRecruters(1, (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.getNewApplicantsRecruters(1, () => {});
      }).toThrow("Database error");
    });
  });

  describe("quitOrg", () => {
    it("should update state to 'Deleted' for the given recruiter ID and organisation SIRET", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.quitOrg(1, "12345", (results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error if query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        recruteur.quitOrg(1, "12345", () => {});
      }).toThrow("Database error");
    });
  });

  describe("creerFichePoste", () => {
    it("should create a new job post", (done) => {
      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.creerFichePoste("Developer", "Full-time", 40000, 60000, "Job description", "Open", 1, 2, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.creerFichePoste("Developer", "Full-time", 40000, 60000, "Job description", "Open", 1, 2, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("creerOffre", () => {
    it("should create a new offer", (done) => {
      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.creerOffre("2024-12-31", "Job indications", 1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.creerOffre("2024-12-31", "Job indications", 1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("getSiret", () => {
    it("should return the SIRET for the given user ID", (done) => {
      const mockResults = [{ organisation: "12345" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getSiret(1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.getSiret(1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("getIdOffre", () => {
    it("should return the latest offer ID", (done) => {
      const mockResults = [{ id_offre: 1 }];
      db.query.mockImplementation((sql, callback) => {
        callback(null, mockResults);
      });

      recruteur.getIdOffre((err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, callback) => {
        callback(mockError, null);
      });

      recruteur.getIdOffre((err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("offreOrga", () => {
    it("should link an offer with an organisation", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.offreOrga("12345", 1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.offreOrga("12345", 1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("getIntitule", () => {
    it("should return job titles for the given recruiter ID", (done) => {
      const mockResults = [{ id_fiche_poste: 1, intitule: "Developer" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.getIntitule(1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.getIntitule(1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("modifyCand", () => {
    it("should modify the state of a candidature", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.modifyCand(1, "Approved", (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.modifyCand(1, "Approved", (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("disableOffre", () => {
    it("should disable an offer", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.disableOffre(1, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.disableOffre(1, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("modifyIntitule", () => {
    it("should modify the title of a job post", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.modifyIntitule(1, "Senior Developer", (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.modifyIntitule(1, "Senior Developer", (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("modifyRTravail", () => {
    it("should modify the work rhythm of a job post", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.modifyRTravail(1, "Part-time", (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.modifyRTravail(1, "Part-time", (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("modifySalMin", () => {
    it("should modify the minimum salary of a job post", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.modifySalMin(1, 45000, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.modifySalMin(1, 45000, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("modifySalMax", () => {
    it("should modify the maximum salary of a job post", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      recruteur.modifySalMax(1, 70000, (err, results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      recruteur.modifySalMax(1, 70000, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

});
