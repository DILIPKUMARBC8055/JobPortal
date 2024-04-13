// Define the Job class
export default class Job {
    // Constructor to initialize a Job object with properties
    constructor(
      company,
      category,
      post,
      location,
      LPA,
      skills,
      lastDate,
      numberOfPosts
    ) {
      // Assign a unique ID to the job based on the length of the jobs array
      this.id = jobs.length + 1;
      // Initialize properties of the Job object
      this.company = company;
      this.category = category;
      this.post = post;
      this.location = location;
      this.LPA = LPA;
      this.skills = skills;
      this.lastDate = lastDate;
      this.numberOfPosts = numberOfPosts;
      // Initialize the applicants count to 0
      this.applicants = 0;
    }
  
    // Static method to retrieve all jobs
    static GetJobs() {
      return jobs;
    }
  
    // Static method to add a new job
    static addJob(job) {
      jobs.push(job);
    }
  
    // Static method to delete a job
    static deleteJob(job) {
      const index = jobs.findIndex((i) => i.id == job.id);
      if (index !== -1) {
        // Remove the job from the jobs array if found
        jobs.splice(index, 1);
      }
    }
  
    // Static method to update the applicant count for a job
    static updateJob(id) {
      const index = jobs.findIndex((i) => i.id == id);
      if (index !== -1) {
        // Increment the applicant count for the specified job
        jobs[index].applicants++;
        console.log(jobs[index]);
      }
    }
  
    // Static method to filter jobs based on company name
    static filterJobs(name) {
      return jobs.filter(
        (job) => job.company.toLowerCase() === name.toLowerCase()
      );
    }
  
    // Static method to retrieve a job by its ID
    static getJob(id) {
      const index = jobs.findIndex((i) => i.id == id);
      if (index !== -1) {
        // Return the job if found
        return jobs[index];
      }
    }
  }
  
  // Sample array of job listings
  const jobs = [
    {
      id: 1,
      company: "Coding Ninjas",
      category: "tech",
      post: "SDE",
      location: "Gurgaon, HR IND Remote",
      LPA: "14-20",
      skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      lastDate: "2024-04-29",
      numberOfPosts: 5,
      applicants: 0,
    },
    {
      id: 2,
      company: "Go Digit",
      category: "tech",
      post: "Angular Developer",
      location: "Pune, IND On-Site",
      LPA: "6-10",
      skills: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
      lastDate: "2024-04-29",
      numberOfPosts: 5,
      applicants: 0,
    },
    {
      id: 3,
      company: "Juspay",
      category: "tech",
      post: "SDE",
      location: "Bangalore, IND",
      LPA: "20-26",
      skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      lastDate: "2024-04-29",
      numberOfPosts: 5,
      applicants: 0,
    },
  ];
  