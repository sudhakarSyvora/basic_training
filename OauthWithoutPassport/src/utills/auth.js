import querystring from "querystring";
import jwt from "jsonwebtoken";

export const getToken = (authcode) => {
  const tokenURL = "https://oauth2.googleapis.com/token";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      code: authcode,
      client_id:
        "823072234510-oan3si0qilvhr0hijrpiid0jgdjog4t2.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:5000/googleToken",
      grant_type: "authorization_code",
    }),
  };
  return fetch(tokenURL, options).then((response) => response.json());
};

export const parseToken = (token) => {
  return jwt.decode(token);
};

export const generateToken = (userData) => {
  console.log(userData)
  return jwt.sign(
    { name: userData?.name, picture: userData?.picture },
    "mySecretKey"
  );
};

 
export const verifyToken = (req, res, next) => {
 console.log("verify token called")
  const accessToken =  req.cookies?.access_token;
 
  if (!accessToken) {
    return res.status(401).json({ error: 'Access token not found' });
  }
   
  jwt.verify(accessToken, 'mySecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded; 
    next();  
  });
};
