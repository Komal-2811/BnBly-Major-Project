const mongoose = require("mongoose");
const Review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
        }
    },

    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

//post mongoose mw-delete all corresponding reviews of a list 
listingSchema.post("findOneAndDelete", async (listing) => {//listing here is the listing which will be deleted
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });//delete those reviews which comes under listing array 
    }

});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
