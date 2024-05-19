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
});
