import express from "express";
import { validateToken } from "../../utils/genToken.js";
import { newOrder } from "../../controllers/orderController.js";

const Orouter = express.Router();

Orouter.route('/create').post(validateToken, newOrder);

export {Orouter}