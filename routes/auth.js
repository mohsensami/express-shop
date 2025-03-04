const express = require("express");
const { check } = require("express-validator");

const authControllers = require("../controllers/auth");

const router = express.Router();

router.get("/login", authControllers.getLogin);

router.post("/login", authControllers.postLogin);

router.get("/register", authControllers.getSingup);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("آدرس ایمیل اشتباه است")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("رمز عبور باید حداقل ۵ کاراکتر باشد")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("رمز عبور یکسان نیست");
      }
      return true;
    }),
  authControllers.postSingup
);

router.post("/logout", authControllers.postLogout);

module.exports = router;
