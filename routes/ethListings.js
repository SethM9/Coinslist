var express = require("express"),
    router = express.Router(),
    ethListing = require('../models/ethListing'),
    middleware = require('../middleware');


//ETH Routes
router.get('/listings/eth', function(req, res){
    ethListing.find({}, function(err, allethListings){
        if(err){
            console.log(err);
        } else {
            res.render('listings/eth.ejs', {ethListings: allethListings, currentUser: req.user, page: 'ethListings'})
        }
    })
});

router.get('/listings/eth/new', middleware.isLoggedIn, function(req, res){
    res.render("listings/ethNew");
});

router.post('/listings/eth', middleware.isLoggedIn, function(req, res){
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
        ethListing.create(newListing, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                req.flash("success", "Listing posted successfully!");
                res.redirect("/listings/eth");
            }
        })
    });
    

module.exports = router;