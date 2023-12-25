import express from "express";
import { generateToken, getToken, parseToken, verifyToken } from "./utills/auth.js";
 import cookieParser from "cookie-parser";
 import cors from "cors"

const app = express();
app.use(cookieParser())
 
const allowedOrigins = ['http://localhost:3000'];

 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  
};
 
app.use(cors(corsOptions));
 

app.get("/googleToken", async (req, res) => {
  const authCode = req.query.code;
  try {
    if (!authCode) {
      throw new Error("Authorization code not found");
    }
    const authData = await getToken(authCode);
    console.log(authData)
    if (!authData || !authData.id_token || !authData.access_token) {
      throw new Error("Invalid authentication data");
    }
    const userData = parseToken(authData.id_token);
    if (!userData) {
      throw new Error("Failed to parse user data from ID token");
    }
    const access_token = generateToken(userData);
    if (!access_token) {
      throw new Error("Failed to generate access token");
    }
    res.cookie("access_token", access_token, { httpOnly: true });
    res.cookie("user_data", JSON.stringify(userData));
    return res.redirect("http://localhost:3000/secret");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: true, message: error.message });
  }
});
app.get('/getUser',verifyToken,(req,res)=>{
  res.send(req.user)
})
 
app.get('/logout', (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("user_data");

  return res.status(200).send('Cookies cleared and user logged out');
});


export default app;
