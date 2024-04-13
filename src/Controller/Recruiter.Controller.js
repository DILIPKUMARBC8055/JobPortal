import { name } from "ejs";
import Recruiter from "../Model/recruiter.Model.js";
import Job from "../Model/job.Model.js";
import Seeker from "../Model/seeker.Model.js";

// RecruiterController class to handle recruiter-related routes and operations
export default class RecruiterController {
  // Handler for registering a new recruiter
  registerRecruiter(req, res) {
    // Destructure the required data from the request body
    const { name, email, password } = req.body;

    // Log the request body for debugging purposes
    console.log(req.body);

    // Create a new recruiter object
    const newRecruiter = new Recruiter(name, email, password);

    // Add the new recruiter to the list of recruiters
    Recruiter.addRecruiter(newRecruiter);

    // Render the login page with no errors
    res.render("login", { errors: null, email: req.session.email });
  }

  // Handler for processing recruiter login
  Postlogin(req, res) {
    // Destructure the required data from the request body
    const { email, password } = req.body;

    // Create a credentials object
    const creds = { email: email, password: password };

    // Check if login is successful using the provided credentials
    if (Recruiter.login(creds)) {
      // Set the session email if login is successful
      req.session.email = email;
      console.log("login successful");

      // Render the jobs page with the user's email and available job listings
      res.render("jobs", { email: email, jobListings: Job.GetJobs() });
    } else {
      // Render the login page with an error message if login fails
      res.render("login", {
        errors: "Enter valid credentials",
        email: req.session.email,
      });
    }
  }

  // Handler for rendering the login page
  getLogin(req, res) {
    // Render the login page with no errors
    res.render("login", { errors: null, email: req.session.email });
  }

  // Handler for rendering the form to post a new job
  getNewJob(req, res) {
    // Render the form page for posting a new job
    res.render("newjob", { email: req.session.email });
  }

  // Handler for viewing the details of a specific job
  viewJobDetails(req, res) {
    // Get the job ID from the request parameters
    const id = req.params.id;

    // Retrieve the job details using the job ID
    const job = Job.getJob(id);

    // Render the job details page with the user's email and job details
    res.render("jobdetails", { email: req.session.email, job: job });
  }

  // Handler for posting a new job
  postNewJob(req, res) {
    // Destructure the required data from the request body
    const {
      job_category: category,
      job_designation: designation,
      job_location: location,
      company_name: companyName,
      salary,
      number_of_openings: openings,
      skills_required: skills,
      apply_by: applyBy,
    } = req.body;

    // Create a new Job object
    const newJob = new Job(
      companyName,
      category,
      designation,
      location,
      salary,
      skills,
      applyBy,
      openings
    );

    // Add the new job to the list of jobs
    Job.addJob(newJob);

    // Log the new job and current job list for debugging purposes
    console.log(newJob);
    console.log(Job.GetJobs());

    // Render the jobs page with the user's email and updated job listings
    res.render("jobs", {
      email: req.session.email,
      jobListings: Job.GetJobs(),
    });
  }

  // Handler for viewing the list of applicants for a specific job
  viewApplicants(req, res) {
    // Get the job ID from the request parameters
    const jobid = req.params.jobid;

    // Retrieve the list of seekers who applied for the specified job
    const applied = Seeker.getSeekersByJobid(jobid);

    // Render the page showing the list of applicants with the user's email
    res.render("appliedforjob", { email: req.session.email, seekers: applied });
  }

  // Handler for logging out the user
  logout(req, res) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("logged out");

        // Render the home page with no email
        res.render("homePage", { email: null });
      }
    });
  }
}
