import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Admin from "../models/AdminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );
};

// Generate 16 random bytes and convert to base64 string
const randomBytes = crypto.randomBytes(256);
const randomHex = randomBytes.toString("base64");

// console.log("Random Bytes:", randomBytes);
// console.log("Random Hex:", randomHex);

// Register new user
export const register = async (req, res) => {
  const {
    email,
    password,
    name,
    role,
    photo,
    gender,
    whofillform,
    workstatus,
    howdoyouknowabout,
    sessionlookingfor,
    explainsituationandcondition,
  } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    if (user) {
      console.log(user);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
        whofillform,
        workstatus,
        howdoyouknowabout,
        sessionlookingfor,
        explainsituationandcondition,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "admin") {
      user = new Admin({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
};

// export const register = async (req, res) => {
//   const { email, password, name, role, photo, gender } = req.body;
//   try {
//     let user = null;
//     if (role === "patient") {
//       user = await User.findOne({ email });
//     } else if (role === "doctor") {
//       user = await Doctor.findOne({ email });
//     } else if (role === "admin") {
//       user = await Admin.findOne({ email });
//     }

//     // Check if user exists
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);

//     const hashPassword = await bcrypt.hash(password, salt);

//     // Create new user based on role

//     if (role === "patient") {
//       user = new User({
//         name,
//         email,
//         password: hashPassword,
//         photo,
//         gender,
//         role,
//       });
//     } else if (role === "doctor") {
//       user = new Doctor({
//         name,
//         email,
//         password: hashPassword,
//         photo,
//         gender,
//         role,
//       });
//     } else if (role === "admin") {
//       user = new Admin({
//         name,
//         email,
//         password: hashPassword,
//         photo,
//         gender,
//         role,
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid role specified" });
//     }

//     // Save the user to the database
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "User successfully created" });
//   } catch (error) {
//     console.error("Error during user registration:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error, try again" });
//   }
// };

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user =
      (await User.findOne({ email })) ||
      (await Doctor.findOne({ email })) ||
      (await Admin.findOne({ email }));

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = bcrypt.compare(password, password);

    console.log(password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    console.log(isPasswordValid);

    // Generate token
    const token = generateToken(user);
    console.log(token);

    const { password: userPassword, role, appointments, ...rest } = user._doc;
    console.log(user._doc);
    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
      appointments,
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
// import User from "../models/UserSchema.js";
// import Doctor from "../models/DoctorSchema.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";

// // Function to generate a JWT token
// const generateToken = (user, expiresIn) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET_KEY,
//     { expiresIn }
//   );
// };

// // Generate 16 random bytes and convert to base64 string
// const randomBytes = crypto.randomBytes(256);
// const randomHex = randomBytes.toString("base64");

// // console.log("Random Bytes:", randomBytes);
// // console.log("Random Hex:", randomHex);

// // Register new user
// export const register = async (req, res) => {
//   const { email, password, name, role, photo, gender } = req.body;
//   try {
//     let user = null;
//     if (role === "patient") {
//       user = await User.findOne({ email });
//     } else if (role === "doctor") {
//       user = await Doctor.findOne({ email });
//     }

//     // Check if user exists
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // Create new user based on role
//     if (role === "patient") {
//       user = new User({
//         name,
//         email,
//         password: hashPassword,
//         photo,
//         gender,
//         role,
//       });
//     } else if (role === "doctor") {
//       user = new Doctor({
//         name,
//         email,
//         password: hashPassword,
//         photo,
//         gender,
//         role,
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid role specified" });
//     }

//     // Save the user to the database
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "User successfully created" });
//   } catch (error) {
//     console.error("Error during user registration:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error, try again" });
//   }
// };

// // User login
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user =
//       (await User.findOne({ email })) || (await Doctor.findOne({ email }));

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Invalid credentials" });
//     }

//     // Generate tokens
//     const accessToken = generateToken(user, "15m"); // Access token valid for 15 minutes
//     const refreshToken = generateToken(user, "90d"); // Refresh token valid for 90 days

//     // Destructure user object to exclude sensitive information
//     const { password: userPassword, ...userData } = user._doc;

//     res.status(200).json({
//       status: true,
//       message: "Successfully logged in",
//       accessToken,
//       refreshToken,
//       data: userData,
//     });
//   } catch (error) {
//     console.error("Error during user login:", error);
//     res.status(500).json({ status: false, message: "Failed to login" });
//   }
// };

// // Refresh token endpoint
// export const refreshToken = async (req, res) => {
//   const { token: refreshToken } = req.body;

//   if (!refreshToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

//     // Fetch user information
//     const user =
//       (await User.findById(decoded.id)) || (await Doctor.findById(decoded.id));

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Generate a new access token
//     const newAccessToken = generateToken(user, "15m");

//     res.status(200).json({
//       success: true,
//       accessToken: newAccessToken,
//     });
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ success: false, message: "Refresh token is expired" });
//     }
//     console.error("Error during token refresh:", error);
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };
