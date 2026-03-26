import createError from "http-errors";
import express, { json, urlencoded, static as expressStatic } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index.js";
import resumeRouter from "./routes/resume.js";

var app = express();

// view engine setup
app.set("views", join(import.meta.dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(import.meta.dirname, "public")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/resume", resumeRouter);

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

export default app;
