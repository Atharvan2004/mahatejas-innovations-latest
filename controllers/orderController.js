import { Multimotor, Airplane, Fpv, Propeller, Esc } from "../models/Mutimotors.js"
import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js"
import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { getUserAndCalculateTotalPrice } from "../middleware/totalPrice.js";
import { mailSend } from "../utils/sendEmail.js";
import { findProductById } from "../utils/findProduct.js";

const newOrder = asyncErrorHandler(async (req, res, next) => {

    const userId = req.user.id;
    const user1 = await User.findById(userId);
    const total = await getUserAndCalculateTotalPrice(userId)
    const date = new Date();
    const productArray = [];

    for (const item of user1.cart) {

        const a = await findProductById(item.productId);
        const p = {
            name: a.name,
            price: item.price,
            quantity: item.quantity,
            selectedKv: item.productKv,
            image: a.image_url,
            id: item.productId
        }
        productArray.push(p);
    }
    

    const order = new Order({
        orderDate: date,
        userId: user1.id,
        userName: user1.firstName + " " + user1.lastName,
        userEmail: req.user.email,
        modal: {
            items: productArray, // Assuming 'item' is an array of objects
          },
        total: total,
        deliveryAddress: req.body.deliveryAddress,
        phoneNo: req.body.phone,
    })

    await order.save()
        .then(() => {
             
            mailSend(order);
        })
        .catch((err) => {
            console.log("Error " + err);
        });

        user1.cart =[];
       await user1.save();

    res.status(201).json({
        success: true,
        order,
    });
});

const cancelOrder = asyncErrorHandler(async (req,res,next)=>{
    if (req.authenticated) {
        // User is authenticated
        const orderId =  req.params.id
        const userId = req.user.id;
        try {
            // Fetch the user's profile from the database using userId
            const userOrder = await Order.findOne({_id:orderId});

            if (!userOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            
            if(userOrder.status=="Pending"){
                userOrder.status="Cancelled by User"
                await userOrder.save();
            }

            // You can access the user's email and ID
            return res.status(200).json({ order: userOrder  });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" +error});
        }
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Not authenticated" });
    }

})

export { newOrder,cancelOrder }
