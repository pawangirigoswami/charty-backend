const User = require("../api/user/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const seedAdmin = async(req,res) => {
    try{
        const admin = await User.findOne({email:"admin@gmail.com"})
        if(!admin){
           
            const adminObj = new User ({
                name:"admin",
                email:"admin@gmail.com",
                password:"$2b$10$ekA.OwS24.jtJW6chj.H4u5rSqq8nQKgOemA9NvNevnf6ps3dKH.G",
                userType:"admin",
                phone:"7497060299",
                address:"pundri"
            })
            
            await adminObj.save()
            console.log("admin created successfully")
           
        }
        
        console.log("admin is already exist")

    }catch(err){
         res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
        console.log("error seeding admin:", err)
    }
}

const adminLogin = async(req,res) =>{
    const {email,password,userType} = req.body
    try{
        if(userType !== "admin"){
            return res.json({
                status:400,
                success:false,
                message:"access denied not an admin user"
            })
        }
        const admin = await User.findOne({email})
        if(!admin || admin.userType !== "admin"){
            return res.json({
                status:404,
                success:false,
                message:"invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.json({
                status:404,
                success:false,
                message:"invalid email or password",

            })
        }

        const token = jwt.sign(
            {id:admin._id, email:admin.email, userType:admin.userType},
            process.env.SECRET_KEY,
            {expiresIn:"1h"}
        );
        return res.json({
            status:200,
            success:true,
            token,
            admin,
            userType,
            message:"login successfully"
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

module.exports = {seedAdmin,adminLogin}