import express from "express";
import { getAllOrders,getAllUsers, getOrder,updateOrder,createProduct,deleteProduct, updateProduct, getAllProducts,setKv,setImage,getImage,deleteImage } from "../../controllers/adminController.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const Arouter = express.Router();

Arouter.route('/orders').get(isAdmin, getAllOrders);
Arouter.route('/orders/:id').get(isAdmin, getOrder);
Arouter.route('/users').get(isAdmin, getAllUsers);
Arouter.route('/orders').get(isAdmin, getAllOrders);
Arouter.route('/products').get(isAdmin, getAllProducts);
Arouter.route('/orders/:id/:status').put(isAdmin, updateOrder);
Arouter.route('/product/create').post(isAdmin, createProduct);
Arouter.route('/product/delete/:id').post(isAdmin, deleteProduct);
Arouter.route('/product/update/:id').post(isAdmin, updateProduct);
Arouter.route('/product/setKv/:id').post(isAdmin, setKv);
Arouter.route('/setImage').post(isAdmin, setImage);
Arouter.route('/getImage').get(isAdmin, getImage);
Arouter.route('/deleteImage/:id').post(isAdmin, deleteImage);

export {Arouter}