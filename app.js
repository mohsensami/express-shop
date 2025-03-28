const path = require("path");
const shopControllers = require("./controllers/shop");

const express = require("express");
const bodyParser = require("body-parser");
// const mongoConnect = require('./util/database').mongodbConnect;
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const multer = require("multer");

const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const store = new MongoDBStore({
  uri: process.env.connectionURL,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views/ejs");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my-super-secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Add global cart data middleware
app.use((req, res, next) => {
  if (!req.user) {
    res.locals.cartItemCount = 0;
    return next();
  }
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      res.locals.cartItemCount = user.cart.items.length;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

let dbUri;

const connectionURL = process.env.connectionURL;

mongoose
  .connect(connectionURL, {})
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// : 'mongodb+srv://user:123456sSa@cluster0.t1qcp.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0';
