// Import necessary modules
import { name } from "ejs"; // Not used in this code snippet, consider removing if not necessary
import multer from "multer"; // Importing multer library to handle file uploads
import path from 'path'; // Importing path module to work with file paths

// Configure multer storage
const uploadfile = multer.diskStorage({
  // Specify the destination directory for uploaded files
  destination: (req, file, cb) => {
    // Use the path module to generate the path to the "Resume" directory
    cb(null, path.join(path.resolve(), "src", "Public", "Resume"));
  },
  // Specify how to name the uploaded files
  filename: (req, file, cb) => {
    // Generate a filename using the current timestamp and the original file name
    const name = Date.now() + file.originalname;
    // Pass the generated filename to the callback
    cb(null, name);
  },
});

// Create multer instance with the specified storage configuration
const fileUpload = multer({ storage: uploadfile });

// Export the fileUpload instance for use in other parts of the application
export default fileUpload;
