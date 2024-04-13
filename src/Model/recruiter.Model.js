// Define the Recruiter class
export default class Recruiter {
    // Constructor to initialize a Recruiter object with properties
    constructor(name, email, password) {
      // Assign a unique ID to the recruiter based on the length of the recruiters array
      this.id = recruiters.length + 1;
      // Initialize properties of the Recruiter object
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    // Static method to add a new recruiter to the list
    static addRecruiter(recruiter) {
      // Add the recruiter to the recruiters array
      recruiters.push(recruiter);
      // Log the current list of recruiters
      console.log(recruiters);
    }
  
    // Static method to authenticate a recruiter based on email and password
    static login(credentials) {
      // Find the recruiter in the list with the matching email and password
      const index = recruiters.findIndex(
        (recruiter) => recruiter.email === credentials.email && recruiter.password === credentials.password
      );
      // Return false if the recruiter is not found; otherwise, return true
      return index !== -1;
    }
  }
  
  // Sample array of recruiters
  const recruiters = [
    {
      id: 1,
      name: "B C DILIP KUMAR",
      email: "test@gmail.com",
      password: "1",
    },
  ];
  