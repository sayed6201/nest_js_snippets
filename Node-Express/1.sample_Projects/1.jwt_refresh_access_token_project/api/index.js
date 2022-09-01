const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());


//datbase mock
const users = [
  {
    id: "1",
    username: "sayed123",
    password: "123456",
    isAdmin: true,
  },
  {
    id: "2",
    username: "samir123",
    password: "123456",
    isAdmin: false,
  },
];

/* ================================================================
    * RefreshToken -> user only sends this to refresh the token, refresh token gets removed and new access and refresh token is generated
    * AccessToken -> only sends to access the api, when it gets invalid they refresh the token with refresh token
    * During login and refresh access and refresh token is generated...
================================================================ */
//storage for storing refreshTokens
let refreshTokens = [];

/* ================================================================
  * This method verifies if the token is valid
  * and retrieve user information from the token 
================================================================ */
const verify = (req, res, next) => {
  //getting data from header ...
  const authHeader = req.headers.authorization;
  if (authHeader) {
    //Bearer 98759328457higdfjh - is passed in the header
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      // we are appending the user data in the request 
      // so that we can design logics, so that only the user or admin can delete the data
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

/* ================================================================
  * generates access token with expiry time
================================================================*/
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "20s", //15m or 20m
  });
};

/* ================================================================
  * generates refresh access token 
================================================================*/
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};


/* ================================================================
All the APIs
================================================================*/
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
   
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    //Generate an accessToken and refreshToken
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //store refresh token inside a database
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});


app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

app.listen(5000, () => console.log("Backend server is running!"));
