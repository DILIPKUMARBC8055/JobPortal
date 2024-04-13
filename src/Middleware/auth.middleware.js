// Auth middleware function for Express.js
export const auth = (req, res, next) => {
    // Check if the user is authenticated by verifying the presence of an email in the session
    if (req.session.email) {
      // If the user is authenticated, allow the request to proceed
      next();
    } else {
      // If the user is not authenticated, render the login page
      res.render("login", { errors: null, email: req.session.email });
    }
  };
  