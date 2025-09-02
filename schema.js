//individual feilds ke uper validation apply kr diya
const joi=require("joi");
const review = require("./models/review");
module.exports.listingSchema=joi.object({
    listing : joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0), //to avoid negataive number set price min to 0 rupees
        image:joi.string().allow("",null) //not need to required
    }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()   //rivewe bhi joi obj honi chahiye
})