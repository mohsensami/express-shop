const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getLogin = (req, res) => {
    const isLoggedIn = req.get('Cookie');
    console.log(isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        isAuth: isLoggedIn,
    });
};

module.exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                // req.flash('error', 'ایمیل یا رمز عبور اشتباه است');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then((result) => {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save((err) => {
                        console.log(err);
                        res.redirect('/');
                    });
                })
                .catch((err) => {
                    console.log(err);
                    // req.flash('error', 'ایمیل یا رمز عبور اشتباه است');
                    res.redirect('/login');
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.getSingup = (req, res) => {
    // let message = req.flash('error');
    // if (message.length > 0) {
    //     message = message[0];
    // } else {
    //     message = null;
    // }
    res.render('auth/signup', {
        pageTitle: 'signup',
        isAuth: false,
        // errorMessage: message,
        // lastInput: {
        //     email: '',
        //     password: '',
        //     confirmPassword: '',
        // },
    });
};

module.exports.postSingup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12);
        })
        .then((hashedPassword) => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] },
            });
            return user.save();
        })
        .then((result) => {
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};