// path is a built in module in node this is used to exact find out location of folder
// path.join() different folder ko jodkar ek complete path bnata ha
//const full path = path.join(__dirname,"server","public","uploads")
// server/public/uploads 

// path.extname  kisi bhi file ka extension nikalta ha
// const ext = path.extname(profile.jpg)
// jpg

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"..","public","uploads"))
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random()*1e9)
        const extname = path.extname(file.originalname);
        cb(null,file.fieldname + "-" + uniqueSuffix + extname)
    }

})

const upload = multer({storage})
module.exports = upload