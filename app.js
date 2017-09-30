var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    methodOverride = require("method-override")
    User = require("./models/user"),
    Wallet = require("./models/wallet"),
    btcListing = require("./models/btcListing"),
    btcSell = require("./models/btcSell"),
    ethSell = require("./models/ethSell"),
    ltcSell = require("./models/ltcSell"),
    xrpSell = require("./models/xrpSell"),
    ethListing = require('./models/ethListing'),
    ltcListing = require('./models/ltcListing'),
    xrpListing = require('./models/xrpListing'),
    passport = require("passport"),
    LocalStrategy = require('passport-local');
      


var walletRoutes = require("./routes/wallets");
var authRoutes = require("./routes/index");
var btcListingRoutes = require("./routes/btcListings");
var ethListingRoutes = require("./routes/ethListings");
var ltcListingRoutes = require("./routes/ltcListings");
var xrpListingRoutes = require('./routes/xrpListings');
var btcSellRoutes = require("./routes/btcSell");
var ethSellRoutes = require("./routes/ethSell");
var ltcSellRoutes = require("./routes/ltcSell");
var xrpSellRoutes = require("./routes/xrpSell");

app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect("mongodb://localhost/coinswap");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: false
}));
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(authRoutes);
app.use(btcListingRoutes);
app.use(ethListingRoutes);
app.use(ltcListingRoutes);
app.use(xrpListingRoutes);
app.use(btcSellRoutes);
app.use(ethSellRoutes);
app.use(ltcSellRoutes);
app.use(xrpSellRoutes);
app.use(walletRoutes);

app.listen(3000, function(){
    console.log("Server is running on port 3000...");
})


//Key: Bg8zHZkDFEeYDXdn4td1TDkVs 
//https://www.worldcoinindex.com/apiservice/json?key={key}