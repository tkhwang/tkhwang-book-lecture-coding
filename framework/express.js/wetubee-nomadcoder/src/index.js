import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();

const middleware = (req, res, next) => {
  console.log("I'm a middleware");
  next();
};

const middlewareProtected = (req, res, next) => {
  res.redirect("/");
};

// Routere
const rootHandler = (req, res) => res.send("/");
const aboutHandler = (req, res) => res.send("About-us");
const contactHandler = (req, res) => res.send("Contact");
const protectedHandler = (req, res) => res.send("Protected");

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(middleware);

app.get("/", rootHandler);
app.get("/about", aboutHandler);
app.get("/contact", contactHandler);
app.get("/protected", middlewareProtected, protectedHandler);

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
