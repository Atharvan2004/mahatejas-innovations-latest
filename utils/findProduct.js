import { Multimotor, Airplane, Fpv, Propeller, Esc } from "../models/Mutimotors.js";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import mongoose from "mongoose";

// Create an array of your models
const productModels = [Multimotor, Airplane, Fpv, Propeller, Esc];

// Define a function to find a product by its productId
async function findProductById(productId) {
  try {
    let product;

    // Iterate through the models and attempt to find the product by productId in each model
    for (const model of productModels) {
      product = await model.findById(productId);
      if (product) {
        // If the product is found in one of the models, break out of the loop
        break;
      }
    }

    // Check if the product was found
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    // Handle any errors, e.g., product not found or database connection issues.
    throw error;
  }
}

export {findProductById};