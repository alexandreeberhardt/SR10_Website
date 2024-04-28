var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('./utils/session');





require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recruteurRouter = require("./routes/recruteur");
var loginRouter = require("./routes/auth");

var app = express();
app.use(session.init());


app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/login/login/", "/login/register/", "/",
      "/login/login", "/login/register"];
  const adminPaths = [
      "/admin/", // mettre toutes nos routes admin
  ]; // list of admin urls

  if (nonSecurePaths.includes(req.path)) return next();

  if (!session.isConnected(req.session)) {
    // si une personne non connectée essaie d'accéder au site alors on lui demande de se connecter
      res.redirect("/login/login"); 
      return;
  }

  if (adminPaths.includes(req.path)) {
    // on vérifie le role admin avant. 
      if (session.isConnected(req.session, "admin")) return next();
      else res.status(403).render(
          "errors/403",
          {
              title: "Unauthorized access",
              message: "Unauthorized access",
              error: {},
          }
      );
  } else if (session.isConnected(req.session)) return next();
});





// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recruteur", recruteurRouter);
app.use("/login",loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
