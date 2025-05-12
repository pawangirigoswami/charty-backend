const Member = require("./memberModel")
const MemberType = require("../membertype/membertypeModel")



const createMember = async(req,res) =>{
    try{
        const validation = []
        const {membertype,name,address,contact,description} = req.body 
        
        const memberTypeExists = await MemberType.findById(membertype)
        if(!memberTypeExists){
            return res.json({
                status:404,
                success:false,
                message:"member type not found"
            })
        }
        if(!name || typeof name !== "string"){
            validation.push("name is required and type must be string")
        }
        if(!address || typeof address !== "string"){
            validation.push("address is required and must be string")
        }
        if(!contact || typeof contact !== "string"){
            validation.push("contact is required and must be string")
        }
        if(!description || typeof description !== "string"){
            validation.push("description is required and type must be string")
        }

        if(validation.length >0){
            return res.json({
                status:400,
                sucecss:false,
                message:"validation error",
                error:validation
            })
        }
        const image = req.files?.image?.[0]?.filename || ""
        const addressProof = req.files?.addressProof?.[0]?.filename || "";
        const idProof = req.files?.idProof?.[0]?.filename || "";

        const newMember = new Member({
            membertype,
            name,
            image,
            address,
            contact,
            addressProof,
            idProof,
            description
        })

        const savedMember = await newMember.save()
        res.json({
            status:201,
            success:true,
            message:"new member create successfully",
            data:savedMember
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

const getallMember = async(req,res) =>{
    try{
        const member = await Member.find().populate("membertype")
        res.json({
            status:200,
            success:true,
            message:"all member is get successfully",
            data:member
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

const getMemberById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required",
                
            })
        }

        const member = await Member.findById(id).populate("membertype")
        if(!member){
            return res.json({
                status:403,
                success:false,
                message:"member is not found"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"member is fetched successfully",
            data:member
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

const updateMemberById = async (req, res) => {
    try {
      const { id, ...data } = req.body;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Member ID is required",
        });
      }
  
      const existingMember = await Member.findById(id);
      if (!existingMember) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }
  
      // Handle file upload with fallbacks
      const image = req.files?.image?.[0]?.filename || existingMember.image;
      const addressProof = req.files?.addressProof?.[0]?.filename || existingMember.addressProof;
      const idProof = req.files?.idProof?.[0]?.filename || existingMember.idProof;
  
      const updatedMember = await Member.findByIdAndUpdate(
        id,
        {
          ...data,
          image,
          addressProof,
          idProof,
        },
        { new: true }
      );
  
      return res.status(200).json({
        success: true,
        message: "Member updated successfully",
        data: updatedMember,
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  };
  
const deleteMemberById = async(req,res) =>{
    try{
        const {id} = req.body
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const member = await Member.findById(id)
        if(!member){
            return res.json({
                status:404,
                success:false,
                message:"member is not found"
            })
        }

      

        await Member.findByIdAndDelete(id)
        res.json({
            status:200,
            success:true,
            message:"member delete successfully"
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

module.exports = {createMember,getallMember,getMemberById,updateMemberById,deleteMemberById}
