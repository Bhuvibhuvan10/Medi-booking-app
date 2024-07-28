// import jwt from "jsonwebtoken";
// import Doctor from "../models/DoctorSchema.js";
// import User from "../models/UserSchema.js";

// // Authentication middleware
// export const authenticate = async (req, res, next) => {
//   // Ensure req.headers is defined
//   if (!req.headers) {
//     return res.status(400).json({ success: false, message: "Bad Request" });
//   }

//   // Get token from headers
//   const authToken = req.headers.authorization;
//   console.log(authToken);
//   // Check token existence and format
//   if (!authToken || !authToken.startsWith(`Bearer `)) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No Token, authorization denied" });
//   }

//   try {
//     // Extract the token from the 'Bearer ' scheme
//     const token = authToken.split(" ")[1];

//     // Verify the token (assuming you have a secret or public key)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Fetch user information
//     console.log("decoded");
//     console.log(decoded);
//     const user = await User.findById(decoded.id);
//     console.log("user!!");
//     console.log(user);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found sdsd" });
//     }
//     req.user = user;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ success: false, message: "Token is expired" });
//     }
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // Role-based authorization middleware
// export const restrict = (roles) => async (req, res, next) => {
//   const userId = req.user.id;

//   try {
//     // Check if the user is a patient or a doctor
//     let user = await User.findById(userId);
//     if (!user) {
//       user = await Doctor.findById(userId);
//       if (!user) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User not found" });
//       }
//     }

//     // Check if the user's role is authorized
//     if (!roles.includes(user.role)) {
//       return res
//         .status(403)
//         .json({ success: false, message: "You are not authorized" });
//     }

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Endpoint to refresh tokens
// export const refreshTokens = async (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     return res.status(401).json({ message: "Refresh token is required" });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
//     const user =
//       (await User.findById(decoded.id)) || (await Doctor.findById(decoded.id));
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newAccessToken = generateToken(user, "15m");

//     res.status(200).json({
//       accessToken: newAccessToken,
//     });
//   } catch (error) {
//     console.error("Error during token refresh:", error);
//     return res
//       .status(401)
//       .json({ message: "Invalid or expired refresh token" });
//   }
// };

// import jwt from "jsonwebtoken";
// import Doctor from "../models/DoctorSchema.js";
// import User from "../models/UserSchema.js";

// export const authenticate = async (res, req, next) => {
//   // get token from headers
//   const authToken = req.headers.authorization;

//   // check token is exist
//   if (!authToken || !authToken.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No Token ,authorization denied" });
//   }
//   try {
//     console.log(authToken);
//     next();
//   } catch (error) {}
// };
import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Admin from "../models/AdminSchema.js";

// Authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    // Ensure req.headers is defined and contains the authorization header
    const authToken = req.headers.authorization;
    console.log(authToken, "authtoken");
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Extract the token from the 'Bearer ' scheme
    const token = authToken.split(" ")[1];
    console.log(token)

    // Verify the token (assuming you have a secret or public key)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded token or user data to the request object
    req.userId = decoded.id;
    req.role = decoded.role;

    // Find the user by ID
    const user =
      (await User.findById(decoded.id)) ||
      (await Doctor.findById(decoded.id)) ||
      (await Admin.findById(decoded.id));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Role-based authorization middleware
export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(req.user.id);
    const user =
      (await User.findById(userId)) ||
      (await Doctor.findById(userId)) ||
      (await Admin.findById(userId));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// import jwt from "jsonwebtoken";
// import Doctor from "../models/DoctorSchema.js";
// import User from "../models/UserSchema.js";
// import Admin from "../models/AdminSchema.js";

// // Authentication middleware
// export const authenticate = async (req, res, next) => {
//   // Ensure req.headers is defined
//   if (!req.headers) {
//     return res.status(400).json({ success: false, message: "Bad Request" });
//   }

//   // Get token from headers
//   const authToken = req.headers.authorization;

//   console.log("authToken");
//   console.log(authToken);

//   // Check token existence and format
//   if (!authToken || !authToken.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No Token, authorization denied" });
//   }

//   try {
//     // Extract the token from the 'Bearer ' scheme
//     const token = authToken.split(" ")[1];

//     // Verify the token (assuming you have a secret or public key)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Optionally, you can attach the decoded token or user data to the request object
//     req.userId = decoded.id;
//     console.log("decoded.id");
//     console.log(decoded.role);
//     req.role = decoded.role;
//     console.log("backend", token);
//     const user =
//       (await User.findById(decoded.id)) ||
//       (await Doctor.findById(decoded.id)) ||
//       (await Admin.findById(decoded.id));
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     req.user = user;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ success: false, message: "Token is expired" });
//     }
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // Role-based authorization middleware
// export const restrict = (roles) => async (req, res, next) => {
//   const userId = req.user.id;

//   let user;
//   const patient = await User.findById(userId);
//   const doctor = await Doctor.findById(userId);
//   const admin = await Admin.findById(userId);

//   if (patient) {
//     user = patient;
//   } else if (doctor) {
//     user = doctor;
//   } else if (admin) {
//     user = admin;
//   } else {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   if (!roles.includes(user.role)) {
//     return res
//       .status(403)
//       .json({ success: false, message: "You are not authorized" });
//   }

//   next();
// };
