import { Multimotor, Airplane, Fpv, Propeller, Esc } from "../models/Mutimotors.js"
import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js"
import { User } from "../models/Users.js";
import { findProductById,findProductByQuery } from "../utils/findProduct.js";
const models = { Multimotor, Airplane, Fpv, Propeller, Esc, };

const getProducts = asyncErrorHandler(async (req, res, next) => {
    const productsParam = req.params.products;
    const categoryParam = req.params.category;
    const selectedModel = models[productsParam]
    console.log(productsParam + "\t" + categoryParam)
    if (!selectedModel) {
        return res.status(400).json({ message: "Invalid product parameter" });
    }
    try {
        const Products = await selectedModel.find({ category: categoryParam + " Series" });

        if (!Products || Products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(Products);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const productsParam = req.params.products;
    const selectedModel = models[productsParam];
    console.log(productsParam)

    if (!selectedModel) {
        return res.status(400).json({ message: "Invalid product parameter" });
    }
    try {
        const Products = await selectedModel.find();

        if (!Products || Products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(Products);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const productId = req.params.id;

    try {
        const Products = await findProductById(productId);

        if (!Products || Products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(Products);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const createProductReview = asyncErrorHandler(async (req, res, next) => {
    const model = req.params.products;
    const productId = req.params.id;
    const currentDate = new Date();
    const Uid = req.user.id;
    const user1 = await User.findById(Uid);

    const review =
    {
        name: user1.firstName + " " + user1.lastName,
        date: currentDate,
        comment: req.body.comment,
        rating: req.body.rating
    }


    const product = await findProductById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product.reviews.push(review);

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;

    await product.save().catch((err) => {
        console.log(err + " error")
    });

    res.status(200).json({
        success: true
    });
});

const searchProduct = asyncErrorHandler(async (req, res, next) =>  {
    
    try {
        const product = await findProductByQuery(req.body.query);
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json("Error in finding products: "+err)
    }
});


export { getProducts, getAllProducts, getProductDetails, createProductReview,searchProduct };