import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    token: String,
    img:{
        type: String,
        required: false, //setar um false no required da img
        default: null,
    },
    points:{
        type: Number,
        required: true,
        default: 0,
    }
})

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model("User", UserSchema);
export default User;