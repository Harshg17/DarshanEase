const jwt = require('jsonwebtoken');

// 1. Middleware to verify if the user is logged in (Valid Token)
exports.verifyToken = (req, res, next) => {
  let token;

  // Check if the token is in the headers (standard practice is "Bearer <token>")
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the actual token
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user info (id, role) to the request object so the next functions can use it
    req.user = decoded; 
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Add this below verifyToken
exports.isAdmin = (req, res, next) => {
  // Assuming your user model has a 'role' field we set earlier
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access Denied: Admin privileges required.' });
  }
};

// 2. Middleware to check if the user has the correct role
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user was set by the verifyToken middleware above
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user ? req.user.role : 'None'}) is not allowed to access this resource.` 
      });
    }
    next();
  };
};