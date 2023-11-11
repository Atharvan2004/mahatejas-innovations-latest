import mongoose from "mongoose";
import { conn } from "./conn.js"


const multimotorSchema = await new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String, // You can specify your description type if needed
  price: {
    type: Number,
    required: true
  },
  kv: [Number],
  weight: [Number],
  category: String,
  rating: Number, // You can define the rating type as per your requirements
  min_quantity: {
    type: Number,
  },
  image_url: [String],
  reviews: [
    {
      name: String,
      date: Date,
      comment: String,
      rating: Number
    }
  ]
});
const airplaneSchema = await new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String, // You can specify your description type if needed
  price: {
    type: Number,
    required: true
  },
  kv: [Number],
  weight: [Number],
  category: String,
  rating: Number, // You can define the rating type as per your requirements
  min_quantity: {
    type: Number,
  },
  image_url: [String],
  reviews: [
    {
      name: String,
      date: Date,
      comment: String,
      rating: Number
    }
  ]
});
const fpvSchema = await new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String, // You can specify your description type if needed
  price: {
    type: Number,
    required: true
  },
  kv: [Number],
  weight: [Number],
  category: String,
  rating: Number, // You can define the rating type as per your requirements
  min_quantity: {
    type: Number,
  },
  image_url: [String],
  reviews: [
    {
      name: String,
      date: Date,
      comment: String,
      rating: Number
    }
  ]
});
const propellerSchema = await new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String, // You can specify your description type if needed
  price: {
    type: Number,
    required: true
  },
  kv: [Number],
  weight: [Number],
  category: String,
  rating: Number, // You can define the rating type as per your requirements
  min_quantity: {
    type: Number,
  },
  image_url: [String],
  reviews: [
    {
      name: String,
      date: Date,
      comment: String,
      rating: Number
    }
  ]
});
const escSchema = await new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String, // You can specify your description type if needed
  price: {
    type: Number,
    required: true
  },
  kv: [Number],
  weight: [Number],
  category: String,
  rating: Number, // You can define the rating type as per your requirements
  min_quantity: {
    type: Number,
  },
  image_url: [String],
  reviews: [
    {
      name: String,
      date: Date,
      comment: String,
      rating: Number
    }
  ]
});

const Multimotor = await mongoose.model('Multimotor', multimotorSchema);
const Airplane = await mongoose.model('Airplane', airplaneSchema);
const Fpv = await mongoose.model('Fpv', fpvSchema);
const Propeller = await mongoose.model('Propeller', propellerSchema);
const Esc = await mongoose.model('Esc', escSchema);
// const documentsToInsert = [
//   {
//       name: "MRH-1",
//       description: "This ESC can be used for multirotor and airplanes. No BEC is integrated in the product. If it is to be used in an airplane, a BEC is required to power up other electronics.This ESC can be used for multirotor and airplanes. No BEC is integrated in the product. If it is to be used in an airplane, a BEC is required to power up other electronics.",
//       price: 2999,
//       kv: [900,400,340,270],
//       weight: [230],
//       category: "Heavy Series",
//       rating: null, // You can set the rating if you have a value
//       min_quantity: 100,
//       image_url: [],
//       reviews: []
//   },
//   // Add more documents as needed
// ];

// // Insert multiple documents using insertMany
// Multimotor.insertMany(documentsToInsert)
//   .then((result) => {
//     console.log('Documents inserted:', result);
//   })
//   .catch((error) => {
//     console.error('Error inserting documents:', error);
//   });

export {Multimotor, Airplane,Fpv,Propeller, Esc}