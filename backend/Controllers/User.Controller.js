import User from '../Models/User.models.js'
import { comparePassword } from '../utils/bcrypt.utils.js';
import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library"

// const authClient = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`)

export const signIn = async (req, res) => {
    console.log("req.body",req.body);
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (!user) return res.status(200).json({ errorcode: 2, status: false, msg: "User doesn't Exist", data: null });
        const cmpPass = await comparePassword(password, user.password);
        if (!cmpPass) {
            res.status(200).json({ errorcode: 3, status: false, msg: "Incorrect Password.", data: null });
        } else {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
            user = { ...user._doc, password: null, token };
            //await insertNotifcation({ userid: user._id, title: "Logged In", message: "Login Successfull" });
            return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In successfully.", data: user });
        }
        // res.status(200).json({ errorcode: 0, status: false, msg: "User signup succesffull", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(200).json({ errorcode: 2, status: false, msg: "Fill all the fields", data: null })

        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(200).json({ errorcode: 3, status: false, msg: "User already Present.Please Login", data: null })

        let newUser = await User.create({
            username: name, email, password
        })
        if (newUser) {
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
            newUser = { ...newUser._doc, password: null, token };
            return res.status(200).json({ errorcode: 0, status: true, msg: "User SignUp Successfull", data: newUser });
        }
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: null });
    }
}
// const getGoogleData = async (tokenId) => {
//     const data = await authClient
//         .verifyIdToken({
//             idToken: tokenId,
//             audience: `${process.env.GOOGLE_CLIENT_ID}`,
//         })
//         .catch((_err) => {
//             return res.status(200).json({ status: false, msg: _err.message, data: null });
//         });

//     return data;
// }

// export const signUpGoogle = async (req, res) => {
//     try {
//         const { tokenId } = req.body;
//         const data = await getGoogleData(tokenId)
//         const payload = data.getPayload();
//         if (!payload) return res.status(200).json({ errorcode: 2, status: false, msg: "Error in fetching user data from google", data: null });
//         const name = payload.name;
//         const email = payload.email;
//         const image = payload.picture;
//         const googleId = data.getUserId();

//         let user=new User({
//             name,email,profilePic:image,googleId
//         })

//         user=await user.save()
//         return res.status(200).json({ errorcode: 0, status: true, msg: "Changed  Successfully", data: null });
//     } catch (e) {
//         return res.status(200).json({ status: false, msg: e.message, data: null });
//     }
// }
