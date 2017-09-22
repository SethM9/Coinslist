var express = require("express"),
    router = express.Router(),
    ltcListing = require('../models/ltcListing'),
    middleware = require('../middleware');


//LTC Routes
router.get('/listings/ltc', function(req, res){
ltcListing.find({}, function(err, allltcListings){
    if(err){
        console.log(err);
    } else {
        res.render('listings/ltc.ejs', {ltcListings: allltcListings, currentUser: req.user, page: 'ltcListings'})
    }
})
});

router.get('/listings/ltc/new', middleware.isLoggedIn, function(req, res){
res.render("listings/ltcNew");
});

router.post('/listings/ltc', middleware.isLoggedIn, function(req, res){
    //Get data from form and add new listings array
    var title = req.body.title;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newListing = {title: title, price: price, description: desc, author: author};
    //Create and save to DB
    ltcListing.create(newListing, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Listing posted successfully!");
            res.redirect("/listings/ltc");
        }
    })
});


module.exports = router;