const Staff = require("./staffModel");
const bcrypt = require("bcryptjs");

const addStaff = async (req, res) => {
  try {
     const validation = []

    const { name, email, password, role, address, employeeId} = req.body;
    
    if(!name || typeof name !== "string"){
        validation.push("name is required and must be string")
    }
    if(!email || typeof email !== "string"){
        validation.push("email is required and must be string")
    }
    if(!password || typeof password !== "string"){
        validation.push("password is required and must be string")
    }
    if(!role || typeof role !== "string"){
        validation.push("role is required and type must be string")
    }
    if(!["staff","manager","supervisor"].includes(role)){
        validation.push("invalid user type")
    }
    if(!address || typeof address !== "string"){
        validation.push("address is required and must be string")
    }

    if (!employeeId || typeof employeeId !== "string"){
        validation.push("employeeid is required and must be string")
    }
    

    if(validation.length > 0){
        return res.json({
            status:400,
            success:false,
            message:"validation error",
            error:validation
        })
    }
    
    // Check for existing email or employeeId
    const existingStaff = await Staff.findOne({email});
    console.log(existingStaff)
    if(existingStaff){
        return res.json({
            status:409,
            success:false,
            message:"staff is already exist"
        })
    }
  

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff member
    const staff = new Staff({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      employeeId,
     
    });
    await staff.save()


    res.json({
        status:201,
        success:true,
        message:"staff created successfully",
        data:staff
    })
   
  } catch (err) {
   res.json({
    status:500,
    success:false,
    message:"internal server error",
    error:err.message
   })
  }
};

const getAllStaff = async(req,res) =>{
    try{
        const staff = await Staff.find()
        res.json({
            status:200,
            success:true,
            message:"all staff is get successfully",
            data:staff
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

const getStaffById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }
        const staff = await Staff.findById(id)
        if(!staff){
            return res.json({
                status:403,
                success:false,
                message:"id is niot found in the database",
            })
        }

        res.json({
            status:200,
            success:true,
            message:"staff is find successfully",
            data:staff
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

const getUpdateStaffById = async(req,res) =>{
    try{
        const {id,...data} = req.body;
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required",

            })
        }

        const staff = await Staff.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!staff){
            return res.json({
                status:403,
                success:false,
                message:"id is not found"
            })
        }
        res.json({
            status:200,
            success:true,
            message:"staff is updated successfully",
            data:staff
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

const deleteStaff = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const staff = await Staff.findByIdAndDelete(id)
        if(!staff){
            return res.json({
                status:403,
                success:false,
                message:"id is not found",

            })
        }

        res.json({
            status:200,
            success:true,
            message:"staff is deleted successfully",
            data:staff
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

module.exports = { addStaff,getAllStaff,getStaffById,getUpdateStaffById,deleteStaff };
