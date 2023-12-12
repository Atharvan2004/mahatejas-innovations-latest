import fileUpload from "express-fileupload";
import imgur from "imgur";
import { model } from "mongoose";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import {
  Airplane,
  Esc,
  Fpv,
  Multimotor,
  Propeller,
} from "../models/Mutimotors.js";
import { Image } from "../models/Image.js";
import { Order } from "../models/Orders.js";
import { User } from "../models/Users.js";
import { findProductById } from "../utils/findProduct.js";
import { mailSend } from "../utils/sendEmail.js";

const models_obj = {
  Multimotor,
  Airplane,
  Fpv,
  Propeller,
  Esc,
};
const models = [Multimotor, Airplane, Fpv, Propeller, Esc];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDirectory = path.resolve(__dirname, "..");
const uploadPath = path.join(parentDirectory, "uploads");

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const users = await User.find();
    if (!users) {
      res.status(404).json("User not found");
    }

    res.status(200).json({
      success: true,
      users,
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const orders = await Order.find();
    if (!orders) {
      res.status(404).json("User not found");
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const productArray = [];
    for (let i of models) {
      const a = await i.find();
      productArray.push(a);
    }
    res.status(200).json({
      success: true,
      productArray,
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const getOrder = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json("User not found");
    }
    res.status(200).json({
      success: true,
      order,
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const updateOrder = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json("User not found");
    }
    const updatedStatus = req.params.status;
    order.status = updatedStatus;
    order.save().then(mailSend);
    res.status(200).json({
      success: true,
      order,
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const createProduct = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const product = {
      type: req.body.type,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      kv: req.body.kv,
      weight: req.body.weight,
      min_quantity: req.body.min_quantity,
      category: req.body.category,
      image_url: req.body.image_url,
    };

    const selectedModel = models_obj[req.body.type];
    await selectedModel.insertMany(product).then((err) => {
      res.status(200).json({
        success: true,
        product,
      });
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const id = req.params.id;
    const product = await findProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } else {
    res.status(400).json("Not an admin");
  }
});

const updateProduct = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const productId = req.params.id;
    const existingProduct = await findProductById(productId);
    let updatedProduct={};
    if (req.body.name) {
      updatedProduct.name = req.body.name;
    }
    if (req.body.description) {
      updatedProduct.description = req.body.description;
    }
    if (req.body.price) {
      updatedProduct.price = req.body.price;
    }
    if (req.body.kv) {
      updatedProduct.kv = req.body.kv;
    }
    if (req.body.weight) {
      updatedProduct.weight = req.body.weight;
    }
    if (req.body.min_quantity) {
      updatedProduct.min_quantity = req.body.min_quantity;
    }
    if (req.body.category) {
      updatedProduct.category = req.body.category+" Series";
    }
    if (req.body.image_url != 0) {
      updatedProduct.image_url = req.body.image_url;
    }
    
    if (req.body.type) {
      // Create a new document using the specified model
      const newProduct =  models_obj[req.body.type](updatedProduct);

      // Save the new document
      await newProduct.save();

      // Remove the existing product
      await existingProduct.deleteOne();

      res.status(200).json({
        success: true,
        newProduct,
      });
    } else {
      // Save the updated existing product
      await existingProduct.updateOne(updatedProduct);

      res.status(200).json({
        success: true,
        existingProduct,
      });
    }
  } else {
    res.status(400).json("Not an admin");
  }
});

const setKv = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    const productId = req.params.id;
    const existingProduct = await findProductById(productId);
    const selectedKv = req.body.selectedKv;
    const kvImgs = req.body.kvImgs;

    const kv = {
      val: selectedKv,
      img: kvImgs
    }

    const existingKvObject = existingProduct.kvImg.find(obj => obj.val === selectedKv);

    if (existingKvObject) {
      // If the val exists, delete the existing object
      existingProduct.kvImg = existingProduct.kvImg.filter(obj => obj.val !== selectedKv);
    }

    existingProduct.kvImg.push(kv);
    await existingProduct.save().catch((err) => {
      res.status(400).json("Error in updating " + err);
    });

    res.status(200).json({
      success: true,
    });
  }
  else {
    res.status(400).json("Not an admin");
  }

});

const setCarousel = asyncErrorHandler(async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const imageArray = req.body.imageArray;
      await Image.deleteMany();
      await Image.insertMany(imageArray)
      const images = await Image.find().sort({ index: 1 });
      res.status(200).json({
        success: true,
        images,
      });
    } catch (err) {
      res.status(400).json("Error in updating images: " + err);
    }
  }
  else {
    res.status(400).json("Not an admin");
  }
})

const getCarousel = asyncErrorHandler(async (req, res, next) => {
    try {
      const imageArray = await Image.find().sort({ index: 1 });
      res.status(200).json({
        success: true,
        imageArray,
      });
    } catch (err) {
      res.status(400).json("Error in loading images: " + err);
    }
})

// const deleteImage = asyncErrorHandler(async (req, res, next) => {
//   if (req.isAdmin) {
//     try {
//       const id= req.params.id;
//       const image = await Image.findById(id);
//       if (!image) {
//         return res.status(404).json({
//           success: false,
//           message: "Image not found",
//         });
//       }
//       await image.deleteOne();
//       res.status(200).json({
//         success: true,
//         message: "Image deleted successfully.",
//       });
//     } catch (err) {
//       res.status(400).json("Error in deleting image: " + err);
//     }
//   }
//   else {
//     res.status(400).json("Not an admin");
//   }

// })

export {
  getAllOrders,
  getAllUsers,
  getOrder,
  updateOrder,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  setKv,
  setCarousel,
  getCarousel,
  // deleteImage
};
