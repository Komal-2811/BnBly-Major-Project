const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
//schema validation
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()) {//to check the user is logged in or not
        //redirect URL
        req.session.redirecturl=req.originalUrl;
        req.flash("error", "you must be logged in ...");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have access to it");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//schema validation -mw
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);//listingschema me jo condition di h kya req.body unhe satisfy kr rhi h 
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");//we can print the additional details with error separated with
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
//validate review
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);//reviewschema me jo condition di h kya req.body unhe satisfy kr rhi h 
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");//we can print the additional details with error separated with
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id, reviewid } = req.params;
    let review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have access to it");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


