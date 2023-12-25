import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/googleToken",
    },
    function (accessToken, refreshToken, profile, cb) {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
      };
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
    console.log(user,'seriliaze user')
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/googleToken",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000/secret");
  }
);
 

 export default app
