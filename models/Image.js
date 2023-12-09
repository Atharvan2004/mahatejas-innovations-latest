import mongoose from "mongoose";
import { conn } from "./conn.js"
const imageSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },

    img: {
        type: String,
        required: true,
    }

});

const Image = mongoose.model('Image', imageSchema);

export { Image }