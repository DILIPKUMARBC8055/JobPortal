import { name } from "ejs";
import Job from "../Model/job.Model.js";
import Seeker from "../Model/seeker.Model.js";

// JobSeeker class to handle job seeker-related routes and operations
export default class JobSeeker {
  
  // Handler for rendering the home page
  homepage(req, res) {
    res.render("homePage", { email: req.session.email });
  }

  // Handler for filtering job listings based on company name
  filterJobs(req, res) {
    const companyName = req.body.companyName;

    // Get filtered job listings using the company name
    const filteredJobListings = Job.filterJobs(companyName);

    // Render the jobs page with the filtered job listings
    res.render("jobs", {
      jobListings: filteredJobListings,
      email: req.session.email,
    });
  }

  // Handler for rendering the jobs page with all available jobs
  jobsAvailable(req, res) {
    // Retrieve all available jobs
    const allJobs = Job.GetJobs();
    
    // Render the jobs page with the list of all available jobs
    res.render("jobs", {
      jobListings: allJobs,
      email: req.session.email,
    });
  }

  // Handler for applying to a job post
  applyToPost(req, res) {
    // Get the file URL for the uploaded resume
    const imageURL = "/src/Public/Images/" + req.file.filename;
    
    // Destructure the required data from the request body
    const { jobid, name, email, contact } = req.body;
    
    // Create a new seeker object
    const seeker = new Seeker(jobid, name, email, contact, imageURL);
    
    // Add the seeker to the seekers list
    Seeker.addSeeker(seeker);
    
    // Update the job posting with the new application
    Job.updateJob(jobid);
    
    // Render the jobs page with updated job listings
    res.render("jobs", {
      jobListings: Job.GetJobs(),
      email: req.session.email,
    });
  }
}
