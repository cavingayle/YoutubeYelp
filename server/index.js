require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require("massive");
const authCtrl = require("./ctrl/authCtrl");
const channelCtrl = require("./ctrl/channelCtrl");
const reviewCtrl = require("./ctrl/reviewCtrl");
const S3Ctrl = require('./ctrl/S3Ctrl')
const genreCtrl = require("./ctrl/genreCtrl");

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//#AUTH ENDPOINTS
app.get("/auth/user", authCtrl.getUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);
app.put("/auth/user/:id", authCtrl.edit);
//# GENRE ENDPOINTS
// app.get("/api/genres", genreCtrl.getGenres);
//# REVIEW ENDPOINTS
app.get("/api/reviews/:id", reviewCtrl.getReviews);
app.post("/api/review/:id", reviewCtrl.addReview);
app.get("/api/recent", reviewCtrl.getRecentReviews);

//# CHANNEL ENDPOINTS
app.post("/api/channel", channelCtrl.addChannel);
app.get("/api/channel/:id", channelCtrl.loadChannels);

//# AWS S3 ENDPOINTS
app.get('/api/signs3', S3Ctrl.sign_s3);
app.post('/auth/pic',authCtrl.pic )

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
