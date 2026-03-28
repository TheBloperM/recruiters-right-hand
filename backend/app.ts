import "dotenv/config";
import createError from "http-errors";
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
  static as expressStatic,
} from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { createServer } from "http";
import debugLib from "debug";

// Routes
import indexRouter from "./routes/index.js";
import resumeRouter from "./routes/resume.js";
import filesRouter from "./routes/file.js";

const debug = debugLib("backend:server");
const app: Express = express();

// --- View Engine Setup ---
app.set("views", join(import.meta.dirname, "views"));
app.set("view engine", "jade");

// --- Middleware ---
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(import.meta.dirname, "public")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// --- Routes ---
app.use("/", indexRouter);
app.use("/resume", resumeRouter);
app.use("/file", filesRouter);

// --- Error Handling ---
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// --- Server Boot Logic (Combined from bin/www) ---
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Server Helper Functions
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error: any) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

export default app;
