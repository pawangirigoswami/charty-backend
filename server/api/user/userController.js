const User  = require("./userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createUser = async(req,res) =>{
    try{
        const validation = []
        const {name,email,password,phone,address,userType} = req.body
        if (!name || typeof name !== "string") {
            validation.push("Name is required and must be a string");
        }
        if (!email || typeof email !== "string") {
            validation.push("Email is required and must be a string");
        }
        if (!password || typeof password !== "string") {
            validation.push("Password is required and must be a string");
        }
        if (!phone || typeof phone !== "string") {
            validation.push("Phone number is required and must be a string");
        }
        if (!address || typeof address !== "string") {
            validation.push("Address is required and must be a string");
        }
        if(!userType || typeof userType !== "string"){
            validation.push("User type is required and mustbe a string")
        }
        if(!["admin","user","donor"].includes(userType)){
            validation.push("invalid user type")
        }
        if(validation.length > 0){
            return res.json({
                status:422,
                success:false,
                message:"validation error",
                error:validation
            })
        }

        const users = await User.findOne({email});
        if(users){
            return res.json({
                status:400,
                success:false,
                message:`${users.userType} is already exist`
            })
        }

        // hash the password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = new User({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            userType
        })
     
        await user.save()
        res.json({
            status:201,
            success:true,
            message:"user create successfully",
            data:user
        })


    }catch(err){
         res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
         })
    }
}


const loginUser = async(req,res) =>{
    const {email,password,userType} = req.body
    try{
        // 1. check if user is exist 
        const user = await User.findOne({email})  
        if(!user){
            return res.json({
                status:404,
                success:false,
                message:"user not found",

            })
        }  
        
        // check user type
        if(user.userType !== userType){
            return res.json({
                status:401,
                success:false,
                message:"user type mismatch",

            })
        }

        // compare password 

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({
                status:401,
                success:false,
                message:"invalid credential"
            })
        }

        // Generate JWT 

        const token  = jwt.sign(
            {userId:user._id,userType:user.userType},
            process.env.SECRET_KEY,
            {expiresIn:"1d"}

        )

        res.json({
            status:200,
            success:true,
            message:"login successfully",
            token,
            user:{
                id:user._id,
                email:user.email,
                userType:user.userType
            }

        })

    }catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}

const getAllUser = async(req,res) =>{
    try{
        const user = await User.find()
        res.json({
            status:200,
            success:true,
            message:"user get successfully",
            data:user
        }) 

    }catch(err){
      return res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
      })
    }
}

const getUserById = async(req,res) =>{
    try{
      
        const {id} = req.body;
        console.log(id)
       if(!id){
        return res.json({
            status:400,
            success:false,
            message:"id is required"
        })
       }
     

        const user = await User.findById(id)
        console.log(user)
        if(!user){
            return res.json({
                status:404,
                success:false,
                message:"user id is wrong"
            })
        }
        res.json({
            status:200,
            success:true,
            messsage:"user fetched successfully",
            data:user
        })



    }catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}

const updatedUser = async(req,res) =>{
    try{
        const {id,...userData} = req.body
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const updatedUsers = await User.findByIdAndUpdate(id,userData,{new:true})
        if(!updatedUsers){
            return res.json({
                status:404,
                status:false,
                message:"id is not found",

            })
        }
         
        res.json({
            status:200,
            success:true,
            message:"user updated successfully",
            data:updatedUsers
        })


    }catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}

const deletedUser = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const deleteUsers = await User.findByIdAndDelete(id)
        if(!deleteUsers){
            return res.json({
                status:404,
                success:false,
                message:"id is not found",
                
            })
        }

        res.json({
            status:200,
            success:true,
            message:"user deleted successfully",

        })

    }catch(err){
      res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
      })
    }
}

module.exports = {createUser,loginUser,getAllUser,getUserById,updatedUser,deletedUser}