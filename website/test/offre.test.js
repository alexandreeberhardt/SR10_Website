const db = require("../model/db.js");
const offer = require("../model/offer.js");

jest.mock("../model/db.js");

describe("Offer Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("read", () => {
    it("should return offer details for the given ID", (done) => {
      const mockResults = [{ id_offre: 1, intitule: "Developer" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.read(1, (results) => {
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
        offer.read(1, () => {});
      }).toThrow("Database error");
    });
  });

  describe("readAll", () => {
    it("should return all offers for the given state", (done) => {
      const mockResults = [
        { intitule: "Developer", rythme_travail: "Full-time", salaire_min: 30000, salaire_max: 50000, etat: "Open" },
      ];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.readAll("Open", (results) => {
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
        offer.readAll("Open", () => {});
      }).toThrow("Database error");
    });
  });

  describe("offreDetail", () => {
    it("should return detailed offer information for the given ID", (done) => {
      const mockResults = [{ IdOffre: 1, Intitule_Poste: "Developer" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.offreDetail(1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      offer.offreDetail(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("already", () => {
    it("should return candidature if it exists for the given offer and user ID", (done) => {
      const mockResults = [{ id: 1 }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.already(1, 1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      offer.already(1, 1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("postule", () => {
    it("should insert a new candidature for the given offer and user ID", (done) => {
      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.postule(1, 1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      offer.postule(1, 1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("areValid", () => {
    it("should return true if email and password match", (done) => {
      const mockResults = [{ password: "password" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.areValid("test@example.com", "password", (result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it("should return false if email and password do not match", (done) => {
      const mockResults = [{ password: "password" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      offer.areValid("test@example.com", "wrongpassword", (result) => {
        expect(result).toBe(false);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        callback(mockError, null);
      });

      offer.areValid("test@example.com", "password", (err, result) => {
        expect(err).toBe(mockError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
});
