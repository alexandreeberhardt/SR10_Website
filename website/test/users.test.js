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

  describe("alreadyadmin", () => {
    it("should return admin role if it exists", (done) => {
      const mockResults = [{ id_utilisateur: 1, type_utilisateur: "Administrateur" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.alreadyadmin(1, (err, results) => {
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

      users.alreadyadmin(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("alreadyrecruteur", () => {
    it("should return recruiter role if it exists", (done) => {
      const mockResults = [{ id_utilisateur: 1, type_utilisateur: "Recruteur" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.alreadyrecruteur(1, (err, results) => {
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

      users.alreadyrecruteur(1, (err, results) => {
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

  describe("verifsiret", () => {
    it("should return organisation details if SIRET exists", (done) => {
      const mockResults = [{ siret: "12345678901234" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.verifsiret("12345678901234", (err, results) => {
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

      users.verifsiret("12345678901234", (err, results) => {
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

  describe("supporga", () => {
    it("should delete an organisation", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.supporga("12345678901234", (err, results) => {
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

      users.supporga("12345678901234", (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("findorga", () => {
    it("should return organisation details if SIRET exists", (done) => {
      const mockResults = [{ siret: "12345678901234" }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.findorga("12345678901234", (err, results) => {
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

      users.findorga("12345678901234", (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("unaskadmin", () => {
    it("should delete an admin role request", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.unaskadmin(1, (err, results) => {
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

      users.unaskadmin(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("unaskrecruteur", () => {
    it("should delete a recruiter role request", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.unaskrecruteur(1, (err, results) => {
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

      users.unaskrecruteur(1, (err, results) => {
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

  describe("makeRecruteur", () => {
    it("should create a new recruiter request", (done) => {
      const mockResults = { insertId: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Utilisateur_Roles")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT email FROM Utilisateur")) {
          callback(null, [{ email: "test@example.com" }]);
        }
      });

      users.makeRecruteur(1, "12345678901234", "reason", (err, email) => {
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

      users.makeRecruteur(1, "12345678901234", "reason", (err, email) => {
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

      users.makeRecruteur(1, "12345678901234", "reason", (err, email) => {
        expect(err).toBe(mockError);
        expect(email).toBeNull();
        done();
      });
    });
  });

  describe("addaddress", () => {
    it("should add a new address and return the address details", (done) => {
      const mockResults = { insertId: 1 };
      const mockLieu = [{ id_lieu: 1, adresse: "123 Main St", ville: "Paris", postcode: "75000", pays: "France" }];
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Lieu")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT * from Lieu")) {
          callback(null, mockLieu);
        }
      });

      users.addaddress("123 Main St", "Paris", "75000", "France", (err, lieu) => {
        expect(err).toBeNull();
        expect(lieu).toEqual(mockLieu);
        done();
      });
    });

    it("should return an error if insertion query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Lieu")) {
          callback(mockError, null);
        }
      });

      users.addaddress("123 Main St", "Paris", "75000", "France", (err, lieu) => {
        expect(err).toBe(mockError);
        expect(lieu).toBeNull();
        done();
      });
    });

    it("should return an error if select query fails", (done) => {
      const mockResults = { insertId: 1 };
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Lieu")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT * from Lieu")) {
          callback(mockError, null);
        }
      });

      users.addaddress("123 Main St", "Paris", "75000", "France", (err, lieu) => {
        expect(err).toBe(mockError);
        expect(lieu).toBeNull();
        done();
      });
    });
  });

  describe("createorg", () => {
    it("should create a new organisation and return the email and SIRET", (done) => {
      const mockResults = { insertId: 1 };
      const mockEmail = [{ email: "test@example.com" }];
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Organisation")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT email FROM Utilisateur")) {
          callback(null, mockEmail);
        }
      });

      users.createorg("12345678901234", "OrgName", [{ id_lieu: 1 }], "type", 1, (err, email, siret) => {
        expect(err).toBeNull();
        expect(email).toEqual(mockEmail);
        expect(siret).toBeUndefined();
        done();
      });
    });

    it("should return an error if insertion query fails", (done) => {
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Organisation")) {
          callback(mockError, null);
        }
      });

      users.createorg("12345678901234", "OrgName", [{ id_lieu: 1 }], "type", 1, (err, email, siret) => {
        expect(err).toBe(mockError);
        expect(email).toBeNull();
        expect(siret).toBeNull();
        done();
      });
    });

    it("should return an error if select query fails", (done) => {
      const mockResults = { insertId: 1 };
      const mockError = new Error("Database error");
      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes("INSERT INTO Organisation")) {
          callback(null, mockResults);
        } else if (sql.includes("SELECT email FROM Utilisateur")) {
          callback(mockError, null);
        }
      });

      users.createorg("12345678901234", "OrgName", [{ id_lieu: 1 }], "type", 1, (err, email, siret) => {
        expect(err).toBe(mockError);
        expect(email).toBeNull();
        expect(siret).toBeNull();
        done();
      });
    });
  });

  describe("getAllFromCand", () => {
    it("should return all files from a candidature", (done) => {
      const mockResults = [{ id_piece: 1, candidature: 1 }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.getAllFromCand(1, 1, (err, results) => {
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

      users.getAllFromCand(1, 1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe("deleteFile", () => {
    it("should delete a file", (done) => {
      const mockResults = { affectedRows: 1 };
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, mockResults);
      });

      users.deleteFile(1, (err, results) => {
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

      users.deleteFile(1, (err, results) => {
        expect(err).toBe(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });
});
