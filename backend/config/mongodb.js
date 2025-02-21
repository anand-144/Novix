const mongoose = require('mongoose');

const conn  = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

conn();
