const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Harshath",
    database:"crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res) =>{
    const sqlGet = "SELECT * from contact_db";
    db.query(sqlGet,(err,result) => {
        res.send(result)
    })
})

app.post("/api/post",(req,res) =>{
    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES(?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error)
            console.log(error);
    })
})

app.delete("/api/remove/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error)
            console.log(error);
    })
})

app.get("/api/get/:id",(req,res) =>{
    const {id} = req.params;
    const sqlGet = "SELECT * from contact_db WHERE id = ?";
    db.query(sqlGet,id,(err,result) => {
        if(err)
            console.log(err);
        res.send(result)
    })
})

app.put("/api/update/:id",(req,res) =>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name= ?, email= ?, contact= ? WHERE id=?";
    db.query(sqlUpdate,[name,email,contact,id],(err,result) => {
        if(err)
            console.log(err);
        res.send(result)
    })
})

app.get("/",(req,res)=>{
    res.send("Hello Server");
    // const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES('pravin','pravin@gmail.com','9025545654')";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error",err);
    //     console.log(result.id);
    //     res.send("Hello World!");
    // })
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})