import express from "express";
import { registerUser, loginUser, logoutUser, getUserDetails, addToCart, displayCart, deleteItem, updateQuantity, displayOrders } from "../../controllers/userController.js";
import { validateToken } from "../../utils/genToken.js";
import { contactMail, customMotorMail } from "../../utils/sendEmail.js";
import { cancelOrder } from "../../controllers/orderController.js";
const Urouter = express.Router();

Urouter.route('/register').post(registerUser);
Urouter.route('/login').post(loginUser);
Urouter.route('/logout').get(logoutUser);
Urouter.route('/profile').get(validateToken, getUserDetails);
Urouter.route('/cart/add').post(validateToken, addToCart);
Urouter.route('/cart').get(validateToken, displayCart);
Urouter.route('/orders').get(validateToken, displayOrders);
Urouter.route('/cart/delete').post(validateToken, deleteItem);
Urouter.route('/cart/update').post(validateToken, updateQuantity);
Urouter.route('/feedback').post(validateToken, contactMail);
Urouter.route('/order/delete/:id').post(validateToken, cancelOrder);
Urouter.route('/custom').post(customMotorMail);

export { Urouter };