const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: Number, required: true },
    },
    phone: { type: Number, required: true },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['Razorpay', 'COD'],
        required: true,
    },
    paymentId: {
        type: String,
        default: null,
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    }
}, { timestamps: true });



module.exports = mongoose.model('Order', orderSchema);