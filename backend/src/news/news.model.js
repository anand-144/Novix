const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {  // Changed from duplicate Image1 to image2
        type: String,
        required: true,
    },
    image3: {
        type: String,
        required: true,
    },
    image4: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
