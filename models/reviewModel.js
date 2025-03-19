const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    from: [
        {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    ],
     data: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("review", reviewSchema)