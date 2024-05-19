const db = require("../model/db.js");
const users = require("../model/user.js");
const passwd = require("../utils/passwd");

jest.mock('../model/db.js');
jest.mock('../utils/passwd');

describe("Users Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("readall", () => {
    it("should return all users", (done) => {
      const mockResults = [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }];
      db.query.mockImplementation((sql, callback) => {
        callback(null, mockResults);
      });

      users.readall((results) => {
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should throw an error when the query fails", () => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, callback) => {
        callback(mockError, null);
      });

      expect(() => {
        users.readall(() => {});
      }).toThrow("Database error");
    });
  });

  describe("applied", () => {
    it("should return applied offers for the user", (done) => {
      const mockResults = [{ Name: "Org1", Intitule: "Poste1", IdOffre: 1 }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.applied(1, (err, results) => {
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

      users.applied(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("areValid", () => {
    it("should return true if password matches", (done) => {
      const mockUser = [{ password: "hashedPassword" }];
      db.query.mockImplementation((sql, email, callback) => {
        callback(null, mockUser);
      });

      passwd.comparePassword.mockImplementation((password, hash, callback) => {
        callback(true);
      });

      users.areValid("test@example.com", "password", (err, result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it("should return false if no user found", (done) => {
      db.query.mockImplementation((sql, email, callback) => {
        callback(null, []);
      });

      users.areValid("test@example.com", "password", (err, result) => {
        expect(result).toBe(false);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, email, callback) => {
        callback(mockError, null);
      });

      users.areValid("test@example.com", "password", (err, result) => {
        expect(err).toBe(mockError);
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe("read", () => {
    it("should return user details", (done) => {
      const mockResults = [{ id_utilisateur: 1, email: "test@example.com", nom: "Doe", prenom: "John" }];
      db.query.mockImplementation((sql, email, callback) => {
        callback(null, mockResults);
      });

      users.read("test@example.com", (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return error if email not found", (done) => {
      db.query.mockImplementation((sql, email, callback) => {
        callback(null, []);
      });

      users.read("test@example.com", (err, results) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(results).toEqual([]);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, email, callback) => {
        callback(mockError, null);
      });

      users.read("test@example.com", (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("already", () => {
    it("should return candidature if it exists", (done) => {
      const mockResults = [{ id: 1 }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.already(1, 1, (err, results) => {
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

      users.already(1, 1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("alreadyDetail", () => {
    it("should return offer details", (done) => {
      const mockResults = [{ IdOffre: 1, Intitule_Poste: "Poste1" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.alreadyDetail(1, (err, results) => {
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

      users.alreadyDetail(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("readById", () => {
    it("should return user by ID", (done) => {
      const mockResults = [{ id_utilisateur: 1, email: "test@example.com" }];
      db.query.mockImplementation((sql, id, callback) => {
        callback(null, mockResults);
      });

      users.readById(1, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        done();
      });
    });

    it("should return error if ID not found", (done) => {
      db.query.mockImplementation((sql, id, callback) => {
        callback(null, []);
      });

      users.readById(1, (err, results) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(results).toEqual([]);
        done();
      });
    });

    it("should return an error if query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, id, callback) => {
        callback(mockError, null);
      });

      users.readById(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("create", () => {
    it("should create a new user", (done) => {
      passwd.generateHash.mockImplementation((pwd, callback) => {
        callback("hashedPassword");
      });

      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.create("Doe", "John", "password", "1234567890", "test@example.com", (err, results) => {
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

      users.create("Doe", "John", "password", "1234567890", "test@example.com", (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("update", () => {
    it("should update user details", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.update(1, { nom: "Doe", prenom: "John", telephone: "1234567890", email: "test@example.com" }, (err, results) => {
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

      users.update(1, { nom: "Doe", prenom: "John", telephone: "1234567890", email: "test@example.com" }, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("unpostule", () => {
    it("should delete a candidature", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.unpostule(1, 1, (err, results) => {
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

      users.unpostule(1, 1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("makeAdmin", () => {
    it("should create a new admin request", (done) => {
      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Utilisateur_Roles")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT email FROM Utilisateur")) {
          callback(null, [{ email: "test@example.com" }]);
        }
      });

      users.makeAdmin(1, "reason", (err, email) => {
        expect(err).toBeNull();
        expect(email).toEqual([{ email: "test@example.com" }]);
        done();
      });
    });

    it("should return an error if insertion query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Utilisateur_Roles")) {
          callback(mockError, null);
        }
      });

      users.makeAdmin(1, "reason", (err, email) => {
        expect(err).toBe(mockError);
        expect(email).toBeNull();
        done();
      });
    });

    it("should return an error if select query fails", (done) => {
      const mockResults = { insertId: 1 };
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Utilisateur_Roles")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT email FROM Utilisateur")) {
          callback(mockError, null);
        }
      });

      users.makeAdmin(1, "reason", (err, email) => {
        expect(err).toBe(mockError);
        expect(email).toBeNull();
        done();
      });
    });
  });
});
