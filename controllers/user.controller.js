import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'something is missing',
                success: false
            });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'account already exist with this email',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })
        return res.status(201).json({
            message: 'Account Created Succesfully',
            success: true
        });

    } catch (error) {
        console.log(error);

    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                messgae: 'something is missing',
                success: false
            });
        }
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            });
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({
                messgae: 'Incorrect email or password',
                success: false
            });

        }
        if (role !== user.role) {
            return res.status(400).json({
                messgae: 'user not found with this role',
                success: false
            });

        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoeNumber: user.phoneNumber,
            password: user.password,
            profle: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ${user.fullName}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("toke", "", { maxAge: 0 }).json({
            message: 'logged out successfully',
            succes: true
        });
    }catch(error){
    console.log(error);
}
}

export const updateProfile=async(req,res)=>{
    try{
    const {fullName,email,phoneNumber,bio,skills}=req.body;
    const file=req.file;

    //cloudinary comes here

    let skillArray;
    if(skills){
        skillArray=skills.split(",");
    }
    const userId=req.id //middleware authentication 
    let user= await User.findById(userId);

    if(!user){
        return res.status(400).json({
            messgae: 'user not found',
            success: false
        });
    }
        if(fullName) user.fullName=fullName
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillArray

        //resume will come here later...
        await user.save();
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoeNumber: user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
    return res.status(200).json({
        messgae:'Account updated successfully',
        user,
        success:true
    });
}
    catch(error){
        console.log(error);

    }
}

