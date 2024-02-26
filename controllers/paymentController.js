import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { instance } from "../server.js";
import orderModel from "../models/orderModel.js";

export const checkout = async (req, res) => {
  const { amount, productCart,useAuth } = req.body;
  console.log(useAuth);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });

    const orders = await new orderModel({
      products: productCart,
      // payment: result,
      // buyer: req.user._id,
    }).save();
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error in checkout",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      //Database comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in payment varification",
    });
  }
};
