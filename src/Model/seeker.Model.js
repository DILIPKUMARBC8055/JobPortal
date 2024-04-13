// Define the Seeker class
export default class Seeker {
  // Constructor to initialize a Seeker object with properties
  constructor(jobid, name, email, phone, resumefile) {
    // Assign a unique ID to the seeker based on the length of the seekers array
    this.id = seekers.length + 1;
    // Initialize properties of the Seeker object
    this.jobid = jobid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.resumefile = resumefile;
  }

  // Static method to add a new seeker to the list
  static addSeeker(seeker) {
    // Add the seeker to the seekers array
    seekers.push(seeker);
    // Log the current list of seekers
    console.log(seekers);
  }

  // Static method to delete a seeker from the list
  static deleteSeeker(seeker) {
    // Find the index of the seeker to be deleted based on its ID
    const index = seekers.findIndex((s) => s.id === seeker.id);
    // If the seeker is found, remove it from the array
    if (index !== -1) {
      seekers.splice(index, 1);
    }
  }

  // Static method to update a seeker's information in the list
  static updateSeeker(seeker) {
    // Find the index of the seeker to be updated based on its ID
    const index = seekers.findIndex((s) => s.id === seeker.id);
    // If the seeker is found, update its information in the array
    if (index !== -1) {
      seekers[index] = seeker;
    }
  }

  // Static method to retrieve seekers who applied to a specific job
  static getSeekersByJobid(jobid) {
    // Filter seekers based on the provided job ID
    const appliedSeekers = seekers.filter((s) => s.jobid === jobid);
    // Return the filtered list of seekers
    return appliedSeekers;
  }
}

// Initialize an empty array to hold seeker objects
const seekers = [];
