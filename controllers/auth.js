module.exports.getLogin = (req, res) => {
    const isLoggedIn = req.get('Cookie');
    console.log(isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        isAuth: isLoggedIn,
    });
};

module.exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
    // const email = req.body.email;
    // const password = req.body.password;
    // User.findOne({ email: email })
    //     .then((user) => {
    //         if (!user) {
    //             req.flash('error', 'ایمیل یا رمز عبور اشتباه است');
    //             return res.redirect('/login');
    //         }
    //         bcrypt
    //             .compare(password, user.password)
    //             .then((result) => {
    //                 req.session.isLoggedIn = true;
    //                 req.session.user = user;
    //                 return req.session.save((err) => {
    //                     console.log(err);
    //                     res.redirect('/');
    //                 });
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 req.flash('error', 'ایمیل یا رمز عبور اشتباه است');
    //                 res.redirect('/login');
    //             });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};
