require("dotenv").config()
const express = require("express")
const app = express()
const port  = process.env.PORT || 5001
const path = require("path")
const {seedAdmin} = require("./server/config/seed")
seedAdmin()

const db = require("./server/config/db")
const route = require("./server/routes/route")
const cors = require("cors")
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/uploads",express.static(path.join(__dirname,"server","public","uploads")))
db()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",route)


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`server is running at port number http://localhost:${port}`)
})