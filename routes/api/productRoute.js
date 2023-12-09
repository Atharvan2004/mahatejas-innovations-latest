import express from "express";
import { getProducts,getAllProducts,getProductDetails,createProductReview,searchProduct } from "../../controllers/productController.js";
import { validateToken } from "../../utils/genToken.js";

const router = express.Router();

router.route('/products/:id').get(getProductDetails);
router.route('/:products/:category').get(getProducts);
router.route('/:products').get(getAllProducts);
router.route('/review/:id').put(validateToken, createProductReview);
router.route('/search').post(searchProduct);

// router.route('/admin/reviews')
//     .get(getProductReviews)
//     .delete(isAuthenticatedUser, deleteReview);

export {router};