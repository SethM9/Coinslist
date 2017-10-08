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
    var amount = req.body.amount;
    var desc = req.body.description;
    var payment = req.body.payment;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newListing = {title: title, price: price, amount: amount, description: desc, payment: payment, author: author};
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

router.get("/listings/ltc/:id", function (req, res) {
    ltcListing.findById(req.params.id).exec(function (err, foundltcListing) {
        if (err) {
            console.log(err);
        } else {
            res.render("listings/ltcShow", { ltcListing: foundltcListing });
        }
    })
});

router.delete("/listings/ltc/:id", middleware.checkltcListingOwnership, function (req, res) {
    ltcListing.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", "You don't have permission to do that");
            res.redirect("/listings/ltc");
        } else {
            req.flash("error", "Listing removed successfully!");
            res.redirect("/listings/ltc");
        }
    });
});


module.exports = router;