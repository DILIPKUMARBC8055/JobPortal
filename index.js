import express from "express";
import path from "path";
import JobSeeker from "./src/Controller/JobSeeker.Controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import RecruiterController from "./src/Controller/Recruiter.Controller.js";
import session from "express-session";
import { auth } from "./src/Middleware/auth.middleware.js";
import fileUpload from "./src/Middleware/resumefile.middleware.js";
import cookieParser from "cookie-parser";
import { lastVisited } from "./src/Middleware/lastVisited.middleware.js";
import mail from "./src/Middleware/confirmationmail.middleware.js";

const seeker = new JobSeeker();
const recruiter = new RecruiterController();
const server = express();

// Configure view engine and static file serving
server.set("views", path.join(path.resolve(), "src", "views"));
server.set("view engine", "ejs");
server.use(express.static("Public"));
server.use(expressEjsLayouts);

// Middleware configuration
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  session({
    secret: "secret Key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(cookieParser());
server.use(lastVisited);

// Define routes for the application

// Home page route
server.get("/", seeker.homepage);

// Route for viewing available jobs
server.get("/jobs", seeker.jobsAvailable);

// Recruiter registration
server.post("/register", recruiter.registerRecruiter);

// Recruiter login routes
server.post("/login", recruiter.Postlogin);
server.get("/login", recruiter.getLogin);

// Routes for job posting (restricted to authenticated users)
server.get("/postjob", auth, recruiter.getNewJob);
server.post("/postjob", auth, recruiter.postNewJob);

// View job details route
server.get("/job/:id", recruiter.viewJobDetails);

// Apply to job posting (file upload for resume) and sending confirmation mail to the user 
server.post("/apply/:id", fileUpload.single("resume"),mail, seeker.applyToPost);

// Route for viewing applicants for a specific job (restricted to authenticated users)
server.get("/job/applicants/:jobid", auth, recruiter.viewApplicants);

// Logout route
server.get("/logout", recruiter.logout);

// Search for jobs by company name
server.post("/search", seeker.filterJobs);

// Start the server on port 8080
server.listen(8080);
console.log("Server is listening on port 8080");
