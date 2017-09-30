var express = require("express"),
router = express.Router(),
xrpSell = require('../models/xrpSell'),
middleware = require('../middleware');


router.get("/listings/xrpSell", function(req, res){
xrpSell.find({}, function(err, allxrpSells){
    if(err){
        console.log(err);
    } else {
        res.render("listings/xrpSell", {xrpSells: allxrpSells, currentUser: req.user, page: 'xrpSells'});
    }
});
});

router.get("/listings/xrpSell/new", middleware.isLoggedIn, function(req, res){
res.render("listings/xrpSellNew");
});

router.post("/listings/xrpSell", middleware.isLoggedIn, function(req, res){
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
xrpSell.create(newListing, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
        req.flash("success", "Listing posted successfully!");
        res.redirect("/listings/xrpSell");
    }
})
});

router.get("/listings/xrpSell/:id", function(req, res){
xrpSell.findById(req.params.id).exec(function(err, foundxrpSell){
    if(err){
        console.log(err);
    } else {
        res.render("listings/xrpSellShow", { xrpSell: foundxrpSell });
    }
})
});

router.delete("/listings/xrpSell/:id", middleware.checkxrpSellOwnership, function(req, res){
xrpSell.findByIdAndRemove(req.params.id, function(err){
    if(err){
        req.flash("error", "You don't have permission to do that");
        res.redirect("back");
    } else {
        req.flash("error", "Listing removed successfully!");
        res.redirect("/listings/xrpSell");
    }
});
});

module.exports = router;