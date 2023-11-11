import mongoose from "mongoose";
import { conn } from "./conn.js"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    productId: mongoose.Types.ObjectId,
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price:{type:Number,
    default:null},
    productKv:Number
  }]

});

const User = mongoose.model('User', userSchema);

// const userNew=new User({
//     firstName: "Atharvan",
//     lastName: "Pohnerkar",
//     email: "a@gmail.com",
//     password: "100000", // You should store a hashed password, not plaintext
//     cart: [],
//   })

// userNew.save().then((result) => {
//         console.log('Document inserted:', result);
//       })
//       .catch((error) => {
//         console.error('Error inserting documents:', error);
//       });

export { User }
