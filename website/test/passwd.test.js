const bcrypt = require("bcrypt");
const passwd = require("../utils/passwd");

jest.mock("bcrypt");

describe("passwd module", () => {

    describe("generateHash", () => {
        it("should generate a hash for the given plaintext password", done => {
            const plaintextPassword = "myPassword";
            const fakeHash = "fakeHash";
            
            bcrypt.hash.mockImplementation((password, saltRounds, callback) => {
                callback(null, fakeHash);
            });

            passwd.generateHash(plaintextPassword, hash => {
                expect(hash).toBe(fakeHash);
                done();
            });
        });
    });

    describe("comparePassword", () => {
        it("should return true for correct password comparison", done => {
            const plaintextPassword = "myPassword";
            const fakeHash = "fakeHash";
            
            // Mocking bcrypt.compare to call the callback with true
            bcrypt.compare.mockImplementation((password, hash, callback) => {
                callback(null, true);
            });

            passwd.comparePassword(plaintextPassword, fakeHash, result => {
                expect(result).toBe(true);
                done();
            });
        });

        it("should return false for incorrect password comparison", done => {
            const plaintextPassword = "myPassword";
            const fakeHash = "fakeHash";
            
            bcrypt.compare.mockImplementation((password, hash, callback) => {
                callback(null, false);
            });

            passwd.comparePassword(plaintextPassword, fakeHash, result => {
                expect(result).toBe(false);
                done();
            });
        });
    });
});
