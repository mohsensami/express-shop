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
    User.findById('675af5da9e85329026f53def')
        .then((user) => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch((err) => console.log(err));
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
    // const erorrs = validationResult(req);
    // if (!erorrs.isEmpty()) {
    //     console.log(erorrs.array());
    //     return res.status(422).render('auth/singup', {
    //         pageTitle: 'عضویت',
    //         isAuth: false,
    //         errorMessage: erorrs.array()[0].msg,
    //         lastInput: {
    //             email: email,
    //             password: password,
    //             confirmPassword: confirmPassword,
    //         },
    //     });
    // }
    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                // req.flash('error', 'ایمیل تکراری است');
                return res.redirect('/signup');
            }
            // return bcrypt.hash(password, 12);
            const user = new User({
                email: email,
                password: password,
                cart: { items: [] },
            });
            return user.save();
        })
        // .then((hashedPassword) => {
        //     const user = new User({
        //         email: email,
        //         password: hashedPassword,
        //         cart: { items: [] },
        //     });
        //     return user.save();
        // })
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
