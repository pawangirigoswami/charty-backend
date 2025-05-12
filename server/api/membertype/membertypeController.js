const MemberType = require("./membertypeModel")

const addMemberType = async(req,res) =>{
    try{
        const validation = []
        const {memberType,description} = req.body 
        if(!memberType || typeof memberType !== "string"){
            validation.push("memberType is required and type must be string")
        }
        if(!description || typeof description !== "string"){
            validation.push("description is required and must be string")
        }
        if(validation.length >0){
            return res.json({
                status:400,
                success:false,
                message:"validation error",
                error:validation
            })
        }

        const existingMember = await MemberType.findOne({memberType})
        if(existingMember){
            return res.json({
                status:404,
                success:false,
                message:"member type already exist"
            })
        }
       
        const member = new MemberType({
            memberType,
            description
        })

        await member.save()
        res.json({
            status:201,
            success:true,
            message:"member type is created successfully",
            data:member
        })


    }catch(err){
      res.json({
        status:500,
        success:false,
        message:"internal server error"
      })
    }
}

const getAllMemberTypes = async (req, res) => {
    try {
        const members = await MemberType.find();
        res.json({
            status:200,
            success: true,
            message:"all member Type is fetched successfully",
            data: members
        });
    } catch (err) {
        res.json({
            status:500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


const getMemberTypeById = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }
        const member = await MemberType.findById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member type not found."
            });
        }

        res.json({
            status:200,
            success: true,
            message:"member is fetched successfully",
            data: member
        });
    } catch (err) {
        res.json({
            status:500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


const updateMemberTypeById = async (req, res) => {
    try {
        const { id,...data} = req.body;
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const updatedMember = await MemberType.findByIdAndUpdate(id, data, { new: true });

        if (!updatedMember) {
            return res.json({
                status:404,
                success: false,
                message: "Member type not found."
            });
        }

        res.json({
            status:200,
            success: true,
            message: "Member type updated successfully.",
            data: updatedMember
        });
    } catch (err) {
        res.json({
            status:500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


const deleteMemberTypeById = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }
        const deletedMember = await MemberType.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.json({
                status:404,
                success: false,
                message: "Member type not found."
            });
        }

        res.json({
            status:200,
            success: true,
            message: "Member type deleted successfully."
        });
    } catch (err) {
        res.json({
            status:500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};



module.exports = {addMemberType,getAllMemberTypes,getMemberTypeById,updateMemberTypeById,deleteMemberTypeById}