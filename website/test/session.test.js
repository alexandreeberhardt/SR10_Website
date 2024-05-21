const sessionModule = require("../utils/session");
const expressSession = require("express-session");

jest.mock("express-session", () => {
    return jest.fn(() => (req, res, next) => next());
});

describe("session module", () => {
    let mockSession;
    
    beforeEach(() => {
        mockSession = {
            user: null,
            usermail: null,
            role: null,
            save: jest.fn((callback) => callback(null)),
            destroy: jest.fn()
        };
    });

    describe("init", () => {
        it("should initialize session with correct settings", () => {
            process.env.SESSION_SECRET = "secret";
            const sessionMiddleware = sessionModule.init();
            expect(expressSession).toHaveBeenCalledWith({
                secret: "secret",
                saveUninitialized: true,
                cookie: { maxAge: 3600 * 1000 }, // 1 hour
                resave: false,
            });
        });
    });

    describe("createSession", () => {
        it("should create a session with user, mail, and role", () => {
            const user = { name: "John Doe" };
            const mail = "john.doe@example.com";
            const role = "admin";

            const result = sessionModule.createSession(mockSession, mail, role, user);

            expect(mockSession.user).toBe(user);
            expect(mockSession.usermail).toBe(mail);
            expect(mockSession.role).toBe(role);
            expect(mockSession.save).toHaveBeenCalled();
            expect(result).toBe(mockSession);
        });

        it("should set role to 'candidat' if role is null", () => {
            const user = { name: "John Doe" };
            const mail = "john.doe@example.com";

            const result = sessionModule.createSession(mockSession, mail, null, user);

            expect(mockSession.user).toBe(user);
            expect(mockSession.usermail).toBe(mail);
            expect(mockSession.role).toBe("candidat");
            expect(mockSession.save).toHaveBeenCalled();
            expect(result).toBe(mockSession);
        });
    });

    describe("isConnected", () => {
        it("should return false if usermail is not set", () => {
            expect(sessionModule.isConnected(mockSession)).toBe(false);
        });

        it("should return true if usermail is set and no role is required", () => {
            mockSession.usermail = "john.doe@example.com";
            expect(sessionModule.isConnected(mockSession)).toBe(true);
        });

        it("should return false if usermail is set but role does not match", () => {
            mockSession.usermail = "john.doe@example.com";
            mockSession.role = "admin";
            expect(sessionModule.isConnected(mockSession, "user")).toBe(false);
        });

        it("should return true if usermail is set and role matches", () => {
            mockSession.usermail = "john.doe@example.com";
            mockSession.role = "admin";
            expect(sessionModule.isConnected(mockSession, "admin")).toBe(true);
        });
    });

    describe("deleteSession", () => {
        it("should destroy the session", () => {
            sessionModule.deleteSession(mockSession);
            expect(mockSession.destroy).toHaveBeenCalled();
        });
    });
});
