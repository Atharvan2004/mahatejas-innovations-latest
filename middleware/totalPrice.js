import { User } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";


async function getUserAndCalculateTotalPrice(userId) {
    try {

        const user = await User.findById(userId); // Replace with your actual method for fetching users.

        if (!user) {
            throw new Error('User not found');
        }

        let totalPrice = 0;
        for (const item of user.cart) {
            if (item.price) {
                totalPrice += item.price;
            }
        }

        return totalPrice;

    } catch (error) {
        throw error;
    }
}

export { getUserAndCalculateTotalPrice }
