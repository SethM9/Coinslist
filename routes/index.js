var express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    btcListing = require('../models/btcListing'),
    ethListing = require('../models/ethListing'),
    ltcListing = require('../models/ltcListing'),
    xrpListing = require('../models/xrpListing');

    
router.get("/", function(req, res){
    res.render("landing");
});

//Register routes
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + req.body.username)
            res.redirect("/");
        });
    });
});

//Login routes
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

router.post("/login", passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: 'login'
}));

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged you out");
    res.redirect("/");
});



module.exports = router;
