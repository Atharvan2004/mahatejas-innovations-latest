import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

let mailTransporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.MAIL_AUTH_NAME,
            pass: process.env.MAIL_AUTH_PASS
        },
        authMethod: "PLAIN",
        tls: {
            rejectUnauthorized: true
        },
        secure: true,
        logger: false,
        debug: true,
        port: 465,
        secureConnection: false
    }
)

const mailSend = (async (order, next) => {

    const itemsList = order.modal.items.map(item => {
        return `
          <p>Name: ${item.name}</p>
          <img src="${item.image[0]}" alt="Product Image" width="200" height="150"/>
          <p>Price: ${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Selected KV: ${item.selectedKv}</p>
          <br>
        `;
    }).join('');
    
    const emailBody = `
        <h2>Thanks for ordering, confirmation email will be sent when order gets accepted</h2>
        <p>We'll get in touch regarding the payment</p>
        <h3>Order Details</h3>
        <p>Order Date: ${order.orderDate}</p>
        <p>Customer Name: ${order.userName}</p>
        <p>Order Status: ${order.status}<p>
        <p>Customer Email: ${order.userEmail}</p>
        <p>Total Price: ${order.total}</p>
        <p>Delivery Address: ${order.deliveryAddress}</p>
        <p>Phone Number: ${order.phoneNo}</p>
        <p>Ordered Items:</p>
        ${itemsList}
    `;

    let details = {
        from: process.env.MAIL_FROM,
        to: [process.env.MAIL_TO, order.userEmail, process.env.ADMIN_EMAIL],
        subject: "Order Placed - Mahatejas Innovations",
        html: emailBody
    }


    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Mail sent")
            return "Mail sent"
            next()
        }
    })

})

const contactMail = (async (req,res, next) => {
    
    const emailBody = `
        <h2>${req.body.subject}</h2>
        <p>Customer Name: ${req.body.userName}</p>    
        <p>Customer Email: ${req.body.userEmail}</p>
        <p>Message: ${req.body.message}</p>
    `;

    let details = {
        from: req.body.userEmail,
        to: [process.env.MAIL_TO, process.env.ADMIN_EMAIL],
        subject: "FeedBack Mail",
        html: emailBody
    }


    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Mail sent")
            res.status(200).json("Mail sent successfully")
            next()
        }
    })

})

export { mailSend,contactMail}