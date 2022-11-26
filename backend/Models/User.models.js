import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            default:null
        },
        email: {
            type: String,
            default: null,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim: true, 
            lowercase: true
        },
        password: {
            type: String,
            default:null
        },
        isSubscribed: {
            type: Boolean,
            default:false
        },
        plan: {
            type: Number,
            default:0
        },
    },{
        timestamps:true
    }
)

userModel.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

const User=mongoose.model("User",userModel)
export default User