import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import { User } from "../models/Users.js";
import { encrypt, comparePass } from "../middleware/encryption.js";
import { generateToken } from "../utils/genToken.js";
import { findProductById } from "../utils/findProduct.js";
import {Order} from "../models/Orders.js"


const registerUser = asyncErrorHandler(async (req, res, next) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const password = await encrypt(req.body.password);
    const email = req.body.email;
    const newUser = new User({
        firstName: fName,
        lastName: lName,
        email: email,
        password: password,
        cart: [],
    });

    await newUser.save().then(() => {
        const token = generateToken(newUser);
        res.cookie("token", token, {
            maxAge: 60 * 60 * 6 * 1000,
        });
        res.status(200).json("Successfully created User");
    })
        .catch((err) => {
            res.status(400).json("Error in creating " + err);
            next(err);
        })
})

const loginUser = asyncErrorHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = (req.body.password);
    const user = await User.find({ email: email });
    if (user.length==0) {
        res.status(404).json("User not found");
        return;
    }
    const hashedPass = user[0].password;
    const isCorrect = await comparePass(password, hashedPass).catch((err) => {
        res.json(err);
        next(err);
    });
    if (isCorrect) {
        const token = generateToken(user[0]);
        res.cookie("token", token, {
            maxAge: 60 * 60 * 6 * 1000,
        });
        res.status(200).json("Successfully logged in");
    } else {
        res.status(400).json("Incorrect Password");
    }
})

const logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(0),
        httpOnly: true
    });

    res.status(200).json("Logged Out");
});

const getUserDetails = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        // User is authenticated
        const email = req.user.email;
        const userId = req.user.id;
        try {
            // Fetch the user's profile from the database using userId
            const user1 = await User.findOne({email:email});

            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }

            // You can access the user's email and ID
            return res.status(200).json({ success: true, user1});
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

const displayCart = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        let total = 0;
        const productArray =[]
        // User is authenticated
        const userId = req.user.id;
        try {
            
            // Fetch the user's profile from the database using userId
            const user1 = await User.findById(userId);

            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }

            for (const item of user1.cart) {
                total += item.price;
                const a = await findProductById(item.productId);
                const p ={
                    name : a.name,
                    price: item.price,
                    quantity: item.quantity,
                    selectedKv: item.productKv,
                    image: a.image_url,
                    id:item.productId
                }
                productArray.push(p);
            }

            // You can access the user's email and ID
            return res.status(200).json({ cart: productArray, total: total });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        // User is authenticated
        const userId = req.user.id;
        let total =0;
        const productArray =[]
        try {
            const productId = req.body.id;
            const quantity = req.body.quantity;
            const kv=req.body.kv;
            const currentProduct=await findProductById(productId);
            const product = {
                productId:productId,
                productKv:kv,
                price: currentProduct.price*quantity,
                quantity:quantity,
            }
            // Fetch the user's profile from the database using userId
            const user1 = await User.findById(userId);

            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }

            user1.cart.push(product);
            await user1.save();
            for (const item of user1.cart) {
                total += item.price;
                const a = await findProductById(item.productId);
                const p ={
                    name : a.name,
                    price: item.price,
                    quantity: item.quantity,
                    selectedKv: item.productKv,
                    image: a.image_url,
                    id:item.productId
                }
                productArray.push(p);
            }

            // You can access the user's email and ID
            return res.status(200).json({ cart: productArray, total: total });
            
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error"+error });
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

const deleteItem = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        // User is authenticated
        const productId = req.body.id;
        const userId = req.user.id;
        const productArray =[]
        let total =0;
        try {
            // Fetch the user's profile from the database using userId
            const user1 = await User.findById(userId);

            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }
            user1.cart =await user1.cart.filter(item => item.productId != productId);
            await user1.save();
           
            for (const item of user1.cart) {
                total += item.price;
                const a = await findProductById(item.productId);
                const p ={
                    name : a.name,
                    price: item.price,
                    quantity: item.quantity,
                    selectedKv: item.productKv,
                    image: a.image_url
                }
                productArray.push(p);
            }

            // You can access the user's email and ID
            return res.status(200).json({ cart: productArray, total: total });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" +error});
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

const displayOrders = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        let total = 0;
        const productArray =[]
        // User is authenticated
        const userId = req.user.id;
        try {
            
            // Fetch the user's profile from the database using userId
            const user1 = await User.findById(userId);

            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }

            const orders = await Order.find({ "userEmail": user1.email });

            // You can access the user's email and ID
            return res.status(200).json({ orders: orders, total: total });
        } catch (error) {
            
            return res.status(500).json({ message: "Internal Server Error "+ error });
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

const updateQuantity = asyncErrorHandler(async (req, res, next) => {
    if (req.authenticated) {
        // User is authenticated
        const productId = req.body.id;
        const userId = req.user.id;
        const newQuantity = req.body.quantity;
        try {
            // Fetch the user's profile from the database using userId
            const user1 = await User.findById(userId);
            const product = await findProductById(productId);
            if (!user1) {
                return res.status(404).json({ message: "User not found" });
            }
            const itemToUpdate = user1.cart.find(item => item.productId == productId);
            (itemToUpdate.quantity) = newQuantity;
            itemToUpdate.price=newQuantity*product.price;
            user1.save();
            // You can access the user's email and ID
            return res.status(200).json(user1.cart);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  addToCart,
  displayCart,
  deleteItem,
  updateQuantity,
  displayOrders
};
