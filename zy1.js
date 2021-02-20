const express = require("express")
const app = express()
const url = require("url")
// cros跨域
app.all("*", function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/wk",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("数据库连接成功");
}).catch((err)=>{
    console.log(err);
})
let wkSchema = new mongoose.Schema({
    username:String,
    password:String,
})
let wk = mongoose.model("wk",wkSchema)
app.get("/register",(req,res)=>{
    console.log(req.query);
    wk.create(req.query).then(data=>{
        data?res.end("注册成功"):res.end("注册失败")
    })
})
app.get("/login",(req,res)=>{
    wk.find({username:req.query.username,password:req.query.password}).then(data=>{
        data.length == 0 ? res.end("登录失败"):res.end("登录成功")
    })
})
app.listen("3000", () => {
    console.log("3000 is runing");
})