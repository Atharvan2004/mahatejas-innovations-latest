import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (or your user model name)
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    modal: {
        items: [
            {
                name: String,
                price: Number,
                quantity: Number,
                selectedKv: Number,
                image: [String],
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    // Reference to the 'Product' model (if needed)
                    ref: 'Product',
                },
                _id: false
            },
        ]
    },

    total: {
        type: Number,
        required: true,
    },
    deliveryAddress: String,
    phoneNo: String,
    status: {
        type: String,
        default: "Pending"
    }
});

const Order = mongoose.model('Order', orderSchema);

export { Order }
