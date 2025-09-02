const User=require("../models/user");
module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        //to register this user->
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to UrbanRetreats");
            res.redirect("/listings");
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=async (req, res) => {
        req.flash("success", "Welcome back to UrbanRetreats! you are successfully logged in")
        let redirecturl=res.locals.redirecturl||"/listings";
        res.redirect(redirecturl);
};
module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "you are logged out successfully");
        res.redirect("/listings");
    })
}