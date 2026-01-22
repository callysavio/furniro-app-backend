import jwt from "jsonwebtoken";
import httpStatus from "http-status";
const authenticateUser = (req, res, next) => {
  //get authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "Unauthorized",
      message: "Token not provided!",
    });
  }

  //store token in a variable if it exists
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error("JWT Error:", e.message);
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "Unauthorized",
      message: e.message,
    });
  }
};

//function to check user roles
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: "FORBIDDEN",
        message: "Forbidden: Access denied!",
      });
    }
    next();
  };
};
export { authenticateUser, checkRole };
