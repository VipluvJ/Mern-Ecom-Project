import Razorpay from "razorpay";
import Order from "../Models/orderModel.js";
import { verifyPaymentSignature } from "../helpers/verifyPaymentSignature.js";

export const createOrder = async (req, res) => {
  try {
    // Implement Razorpay order creation logic here
    const razorpay = new Razorpay({
      key_id: "rzp_test_3xE6Gnvj2oZoZD",
      key_secret: "YwVB6g1qhn9YpE0xVZmnqvkW",
    });
    const orderOptions = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: "order_receipt",
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);

    const newOrder = new Order({
      products: req.body.products,
      amount: req.body.amount,
      razorpay_order_id: razorpayOrder.id,
    });

    await newOrder.save();

    res.json({ razorpay_order_id: razorpayOrder.id, ...razorpayOrder });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error happen", error });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    // Implement Razorpay payment verification logic here
    const rzp = new Razorpay({
      key_id: "rzp_test_3xE6Gnvj2oZoZD",
      key_secret: "YwVB6g1qhn9YpE0xVZmnqvkW",
    });

    const {
      orderCreationId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const attributes = `${razorpayOrderId}|${razorpayPaymentId}`;

    const isValidSignature = verifyPaymentSignature(
      attributes,
      razorpaySignature
    );

    if (!isValidSignature) {
      return res.status(400).json({ error: "Invalid Signature" });
    }
    order.payment_id = razorpayPaymentId;
    order.payment_signature = razorpaySignature;

    await order.save();

    res.json({ success: true });
  } catch (error) {
    console.log(req.body);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error server", err: error });
  }
};
