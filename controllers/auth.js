module.exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
    });
};
