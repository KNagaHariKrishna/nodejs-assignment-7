const express = require('express')
const app = express()
const bodyParser = require("body-parser");
let studentArray = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

// POST request
app.post("/api/student",(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    const currentClass=req.body.currentClass
    const division=req.body.division
    const f=studentArray.includes(id)
    if(f==false && name!="" && currentClass!="" && division!=""){
     studentArray.push({id,name,currentClass,division})
        res.json({
            message:"New Student Added Successfully"
        })
    }
    else{
        res.status(400).json({
            status:"failed",
            message:"not"
        })
    }
})

// GET request
app.get("/api/student",(req,res)=>{
    res.send({
        status:"Success",
        data:studentArray
    })
})
app.get("/api/student/:id",(req,res)=>{
    const index=studentArray.findIndex(ele=>ele.id==req.params.id)
    const student=studentArray[index]
    if(index>=0){
        res.send({
            student
        })
    }
    else{
        res.status(404).json({
            status:"failed",
            message:"Student Record Not Found"
        })
    }
})

// PUT request
app.put("/api/student/:id",(req,res)=>{
    const index=studentArray.findIndex(ele=>ele.id==req.params.id)
    if(index>=0){
        studentArray[index]=req.body
        res.json({
            message:"updated Successfully"
        })
    }
    else{
        res.status(400).json({
            status:"failed",
            message:"pls Update Correctly"
        })
    }
})

//DELETE request
app.delete("/api/student/:id",(req,res)=>{
    studentArray=studentArray.filter(ele=>ele.id!=req.params.id)
    
    if(studentArray){
        res.json({
            studentArray,
            message:"deleted successfully"
        })
    }
    else{
        res.status(404).json({
            status:"failed",
            message:"enter correct id"
        })
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   