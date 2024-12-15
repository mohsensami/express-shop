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

module.exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
