import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import { User } from "../models/Users.js";
import { findProductById } from "../utils/findProduct.js";
import { Order } from "../models/Orders.js";
import { Multimotor, Airplane, Fpv, Propeller, Esc } from "../models/Mutimotors.js"
import { mailSend } from "../utils/sendEmail.js";
import { model } from "mongoose";
import imgur from "imgur";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const models = [Multimotor, Airplane, Fpv, Propeller, Esc];
const models_obj = { Multimotor, Airplane, Fpv, Propeller, Esc };


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        res.status(400).json("Not an admin")
    }
})

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
        res.status(400).json("Not an admin")
    }

});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const productArray = []
        for (let i of models) {
            const a = await i.find();
            productArray.push(a)
        }
        res.status(200).json({
            success: true,
            productArray,
        });
    } else {
        res.status(400).json("Not an admin")
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
        res.status(400).json("Not an admin")
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
        res.status(400).json("Not an admin")
    }

});

const createProduct = asyncErrorHandler(async (req, res, next) => {

    if (req.isAdmin) {
        const imageArray = [];
        const { fileInput } = req.files;

        if (!fileInput || (Array.isArray(fileInput) && fileInput.length === 0)) {
            return res.status(400).send('No files were uploaded.');
        }

        const files = Array.isArray(fileInput) ? fileInput : [fileInput];

        try {
            const uploadPromises = files.map(async (file) => {
                const uploadFilePath = path.join(uploadPath, file.name);

                // Move the uploaded file to the specified path
                await file.mv(uploadFilePath);

                // Upload file to imgur
                return imgur.uploadFile(uploadFilePath)
                    .then((json) => {
                        console.log(json.data.link);
                        imageArray.push(json.data.link);

                        // If the upload is successful, delete the local file
                        return fs.unlink(uploadFilePath);
                    })
                    .catch((err) => {
                        console.error('Error during imgur upload:', err);

                        // Handle the error appropriately
                        throw err;
                    });
            });

            // Wait for all uploads and deletions to complete
            await Promise.all(uploadPromises);

            // If all files are uploaded successfully and deleted, you can send a success message
            res.send('Files uploaded and deleted successfully!');
        } catch (err) {
            console.error('Error during file upload:', err);
            res.status(500).send(err.message || 'Internal Server Error');
        }

        const product = {
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            kv: req.body.kv,
            weight: req.body.weight,
            min_quantity: req.body.min_quantity,
            category: req.body.category,
            image_url: imageArray
        }

        const selectedModel = models_obj[req.body.type]
        await selectedModel.insertMany(product).then((err) => {
            res.status(200).json({
                success: true,
                product,
            });
        });
    } else {
        res.status(400).json("Not an admin")
    }




});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const id = req.params.id
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
            message: "Product deleted successfully."
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const updateProduct = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const productId = req.params.id;
        const existingProduct = await findProductById(productId);
        const imageArray = [];
        const { fileInput } = req.files;

        if (!fileInput || (Array.isArray(fileInput) && fileInput.length === 0)) {

        }
        else {
            const files = Array.isArray(fileInput) ? fileInput : [fileInput];

            try {
                const uploadPromises = files.map(async (file) => {
                    const uploadFilePath = path.join(uploadPath, file.name);

                    // Move the uploaded file to the specified path
                    await file.mv(uploadFilePath);

                    // Upload file to imgur
                    return imgur.uploadFile(uploadFilePath)
                        .then((json) => {
                            console.log(json.data.link);
                            imageArray.push(json.data.link);

                            // If the upload is successful, delete the local file
                            return fs.unlink(uploadFilePath);
                        })
                        .catch((err) => {
                            console.error('Error during imgur upload:', err);

                            // Handle the error appropriately
                            throw err;
                        });
                });

                // Wait for all uploads and deletions to complete
                await Promise.all(uploadPromises);

                // If all files are uploaded successfully and deleted, you can send a success message
                res.send('Files uploaded and deleted successfully!');
            }

            catch (err) {
                console.error('Error during file upload:', err);
                res.status(500).send(err.message || 'Internal Server Error');
            }

            if (req.body.type) {
                existingProduct.type = req.body.type;
            }
            if (req.body.name) {
                existingProduct.name = req.body.name;
            }
            if (req.body.description) {
                existingProduct.description = req.body.description;
            }
            if (req.body.price) {
                existingProduct.price = req.body.price;
            }
            if (req.body.kv) {
                existingProduct.kv = req.body.kv;
            }
            if (req.body.weight) {
                existingProduct.weight = req.body.weight;
            }
            if (req.body.min_quantity) {
                existingProduct.min_quantity = req.body.min_quantity;
            }
            if (req.body.category) {
                existingProduct.category = req.body.category;
            }
            if (imageArray.length != 0) {
                existingProduct.image_url = imageArray;
            }

            await existingProduct.save().catch((err) => {
                res.status(400).json("Error in updating " + err);
            });

            res.status(200).json({
                success: true,
                existingProduct
            })
        } 

    }else {
        res.status(400).json("Not an admin")
    }});

export { getAllOrders, getAllUsers, getOrder, updateOrder, createProduct, deleteProduct, updateProduct, getAllProducts }
