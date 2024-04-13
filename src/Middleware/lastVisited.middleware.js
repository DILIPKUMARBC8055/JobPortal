// Middleware function to track the last visited time of a user
export const lastVisited = (req, res, next) => {
    // Check if the 'lastVisit' cookie exists in the request
    if (req.cookies.lastVisit) {
        // Convert the 'lastVisit' cookie value to a human-readable date and set it as a local variable
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    // Set a new 'lastVisit' cookie with the current date and time
    res.cookie("lastVisit", new Date().toISOString(), {
        // The cookie will expire in 2 days (2 * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    // Call next to proceed with the request
    next();
};
