const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const express = require('express');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res)=>{
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post('/login', async (req, res)=>{
    if(req.body.email && req.body.password)
    {
        const user = await User.findOne(req.body).select('-password');
        if(user){
            res.send(user);
        }else{
            res.send({result: "User not found"});
        }
    }else{
        res.send({result: "User not found"});
    }
})

app.post('/create-blog', async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/blogs', async (req, res)=>{
    let blogs = await Product.find()
    if(blogs.length > 0){
        res.send(blogs)
    }else{
        res.send({result : "No Blogs found"})
    }
})

app.get('/blogs/:id', async (req, res)=>{
    const result = await Product.find({userId: req.params.id})
    res.send(result)
})

app.delete('/blog/:id', async (req, res)=>{
    const result = await Product.deleteOne({_id: req.params.id})
    res.send(result)
})

app.get("/blog/:id",async (req, res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result : "No record found"})
    }
})

app.put("/blog/:id", async (req, res)=>{
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set : req.body
        }
    )
    res.send(result);
})


const fileUpload = multer({
    storage:multer.diskStorage({
        destination: (req, fields, cb)=>{
            cb(null, "uploads")
        },
        filename: (req, file, cb)=>{
            cb(null, file.filename + "-"+ Date.now() + ".jpeg")
        }
    })
}).single("user_img")



app.post("/upload", fileUpload, (req, res)=>{
    res.send("Done")
})

app.listen(5000);