var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('./utils/session');

var cors=require('cors');


require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recruteurRouter = require("./routes/recruteur");
var loginRouter = require("./routes/auth");
var offerRouter = require("./routes/offre");
var adminRouter = require("./routes/admin");
var apiRouter = require('./routes/api');

var app = express();
app.use(session.init());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.all("*", function (req, res, next) {

  const nonSecurePaths = [
    "/login/login/", "/login/register/", "/", "/404",
      "/login/login", "/login/register", "/api/users"
    ];

  const adminPaths = [
      "/admin/", // mettre toutes nos routes admin
  ]; // list of admin urls

  const recruteurPaths = [
    "/recruteur/", "/recruteur/account_recruteur"
    ,"/recruteur/visualisation_offre", "/recruteur/home_recruteur"
    ,"/recruteur/home_recruteur", "/recruteur/quit_org",
    "/recruteur/" // mettre toutes nos routes recruteur
]; // list of recruteurs urls


  if (nonSecurePaths.includes(req.path)) return next();

  if (!session.isConnected(req.session)) {
    // si une personne non connectée essaie d'accéder au site alors on lui demande de se connecter
      res.redirect("/login/login"); 
      return;
  }

  if (adminPaths.includes(req.path)) {
    // on vérifie le role admin avant. 
      if (session.isConnected(req.session, "Administrateur")) return next();
      else {
        res.status(403).render(
          "errors/403",
          {
              title: "Unauthorized access",
              message: "Unauthorized access",
              error: {},
          }
      );
    }
  }else if (recruteurPaths.includes(req.path)){
    if (session.isConnected(req.session, "Recruteur") || session.isConnected(req.session, "recruteur") ) return next();
      else {
      res.status(403).render(
          "errors/403",
          {
              title: "Unauthorized access",
              message: "Unauthorized access",
              error: {},
          }
      );
    }
  }
  // s'il essaie de se connecter à une route candidat et qu'il est connecté alors tout est bon. 
  else if (session.isConnected(req.session)) return next();

});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recruteur", recruteurRouter);
app.use("/login",loginRouter);
app.use("/offres",offerRouter);
app.use("/admin",adminRouter);
app.use("/api",apiRouter);


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
