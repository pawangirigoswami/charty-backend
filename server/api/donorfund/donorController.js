const Donor = require("./donorModel")

const addAppointment = async(req,res) =>{
    try{
        const validation = []
        const {appointmentfor,reasonforappointment,appointmentdate,appointmenttime} = req.body 
        if(!appointmentfor){
            validation.push("appointment for is required")
        }
        if(!reasonforappointment){
            validation.push("reason for appointment is required")
        }
        if(!appointmentdate){
            validation.push("appointment date is required")
        }
        if(!appointmenttime){
            validation.push("appointment time is required")
        }

        if(validation.length > 0){
            return res.json({
                status:400,
                success:false,
                message:"validation error",
                error:validation
            })
        }

        const appointment = new Donor({
            appointmentfor,
            appointmentdate,
            appointmenttime,
            reasonforappointment
        })

        const saved = await appointment.save()

        res.json({
            status:201,
            success:true,
            message:"appointment is created successfully",
            data:saved
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

const getAllAppointment = async(req,res) =>{
    try{

        const appointment = await Donor.find()
        res.json({
            status:200,
            success:true,
            message:"all appointment is fetched successfully",
            data:appointment
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

const getAppointmentById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const appointment = await Donor.findById(id)
        if(!appointment){
            return res.json({
                status:404,
                success:false,
                message:"appointmenrt is not found"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"appointment is get successfully",
            data:appointment
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

const updatedAppointmentById = async(req,res) =>{
    try{

        const {id,...data} = req.body
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required",

            })
        }

        const ids = await Donor.findById(id)
        if(!ids){
            return res.json({
                status:404,
                success:false,
                message:"appointment is not found"
            })
        }
        

        const appointment = await Donor.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!appointment){
            return res.json({
                status:404,
                success:false,
                message:"appointment is not updated"
            })
        }
        res.json({
            status:200,
            success:true,
            message:"appointment is updated successfully",
            data:appointment
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

const deleteAppointmentById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const deleteAppointment = await Donor.findByIdAndDelete(id)
        if(!deleteAppointment){
            return res.json({
                status:404,
                success:false,
                message:"Appointment is not found"
            })
        }
        
        res.json({
            status:200,
            success:true,
            message:"appointment is deleted successfully"
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

module.exports = {addAppointment,getAllAppointment,getAppointmentById,updatedAppointmentById,deleteAppointmentById}