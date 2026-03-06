const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.verifyToken = (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; 
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};


exports.isAdmin = (req, res, next) => {
  
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access Denied: Admin privileges required.' });
  }
};


exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user ? req.user.role : 'None'}) is not allowed to access this resource.` 
      });
    }
    next();
  };
};
