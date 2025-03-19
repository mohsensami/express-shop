// Middleware to check if user is logged in (for protected routes)
exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("error", "لطفا ابتدا وارد شوید");
    return res.redirect("/login");
  }
  next();
};

// Middleware to check if user is NOT logged in (for login/register pages)
exports.isNotAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/admin/dashboard");
  }
  next();
};
