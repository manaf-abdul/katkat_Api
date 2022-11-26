import  express  from "express";
import { razorpayPayment, successInstallmentPay } from "../Controllers/Payment.Controller.js";
const router=express.Router()
// import {} from '../Controllers/User.Controller.js'

router.post("/razorpay", razorpayPayment)
router.post("/razorpay/success", successInstallmentPay)
// router.post("/signin", signIn)

export default router