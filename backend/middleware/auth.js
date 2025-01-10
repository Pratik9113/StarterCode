import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  const tokenNgo = req.cookies.tokenNgo;

  console.log("Cookies received:", req.cookies);

  // If neither token is present, return an error
  if (!tokenUser && !tokenNgo) {
    return res
      .status(401)
      .json({ success: false, message: "No authentication token received" });
  }

  try {
    if (tokenUser) {
      const decodedu = jwt.verify(tokenUser, process.env.SECRET);
      req.userId = decodedu.userId; // Attach userId to the request
      req.userRole = "user"; // Optional: Add role for further distinction
      return next();
    }

    if (tokenNgo) {
      const decodedn = jwt.verify(tokenNgo, process.env.SECRET);
      req.userId = decodedn.userId; // Attach userId to the request
      req.userRole = "ngo"; // Optional: Add role for further distinction
      return next();
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default jwtAuth;
