import Razorpay from "razorpay"
import shortid from "shortid"
import User from "../Models/User.models.js";
import jwt from "jsonwebtoken";

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_USERNAME,
    key_secret: process.env.RAZORPAY_PASSWORD
})


export const razorpayPayment = async (req, res) => {
    try {
        const payment_capture = 1
        const options = {
            amount: req.body.price * 100,
            currency: req.body.currency,
            receipt: shortid.generate(),
            payment_capture: payment_capture,
        }
        const response = await razorpay.orders.create(options)
        return res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: null });
    }
};

export const successInstallmentPay = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { options, orderdata, response } = req.body;
        const {user}=orderdata;
        let userPresent=await User.findById(user._id)
        userPresent.isSubscribed=true;
        userPresent.plan=options.amount;
        userPresent=await userPresent.save()
        const token = jwt.sign({ userId: userPresent._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
        userPresent = { ...userPresent._doc, password: null, token };
        // console.log("userPresent",userPresent);
        return res.status(200).json({ errorcode: 0, status: true, msg: "Payment Successfull", data: userPresent });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: null });
    }
};