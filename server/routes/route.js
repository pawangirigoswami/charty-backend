const express = require("express");
const { createUser,loginUser, getUserById, getAllUser, updatedUser, deletedUser } = require("../api/user/userController");
const  {adminLogin} = require("../config/seed")
const authMiddleware = require("../middleware/authMiddleware")
const {addStaff,getAllStaff,getStaffById,getUpdateStaffById,deleteStaff} = require("../api/staff/staffController")
const {addMemberType,getAllMemberTypes,getMemberTypeById,updateMemberTypeById,deleteMemberTypeById} = require("../api/membertype/membertypeController")
const {createMember,getallMember,getMemberById,updateMemberById,deleteMemberById} = require("../api/member/memberController")
const {addFund,getAllFund,getFundById,updatefFundById,deleteFund} = require("../api/fundraising/fundController")
const {addAppointment,getAllAppointment,getAppointmentById,updatedAppointmentById,deleteAppointmentById} = require("../api/donorfund/donorController")
const upload = require("../middleware/multer")
const router = express.Router();
router.post("/addappointment",addAppointment)
router.post("/getallappointment",getAllAppointment)
router.post("/getappointment",getAppointmentById)
router.post("/updateappointment",updatedAppointmentById)
router.post("/deleteappointment",deleteAppointmentById)
router.post("/addfund", addFund)
router.post("/getallfund",getAllFund)
router.post("/getfund",getFundById)
router.post("/updatefund",updatefFundById)
router.post("/deletefund",deleteFund)
router.post("/createmember",upload.fields([
    {name:"image",maxCount:1},
    {name:"addressProof",maxCount:1},
    {name:"idProof",maxCount:1}
]),createMember)
router.post("/updatemember",upload.fields([
    {name:"image",maxCount:1},
    {name:"addressProof",maxCount:1},
    {name:"idProof",maxCount:1}
]),updateMemberById)
router.post("/getallmember",getallMember)
router.post("/getmemberbyid",getMemberById)
router.post("/deletememberbyid",deleteMemberById)
router.post("/addmembertype",addMemberType)
router.post("/getallmembertype",getAllMemberTypes)
router.post("/getmembertypebyid",getMemberTypeById)
router.post("/updatemembertypebyid",updateMemberTypeById)
router.post("/deletemembertypebyid",deleteMemberTypeById)
router.post("/deletestaff",deleteStaff)
router.post("/updatestaff",getUpdateStaffById)
router.post("/getstaffbyid",getStaffById)
router.post("/getallstaff",getAllStaff)
router.post("/addstaff",addStaff)
router.post("/loginadmin",adminLogin)
router.post("/createuser",createUser)
router.post("/loginuser",loginUser)
router.post("/getalluser",getAllUser)
router.post("/getuserbyid",getUserById)
router.post("/updateuser",updatedUser)
router.post("/deleteuser",deletedUser)

module.exports = router