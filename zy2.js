const express = require("express");
const app = express();
const url = require("url");
let body_parser=require("body-parser")
app.use(body_parser.urlencoded({
    extended: false
}))
// 跨域
// cros跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
// 操作数据库
let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/zy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("连接数据库成功");
  })
  .catch((err) => {
    console.log(err);
  });
// 设定列表集合规则
const zySchema = new mongoose.Schema({
  username:String,
  age:Number,
  sex:String,
});
// 创建集合
let zy = mongoose.model("student", zySchema);
// 增加用户接口
app.get("/add",(req,res)=>{
  zy.create(req.query).then(data=>{
    data?res.send({status:1,msg:'增加成功'}):res.send({status:0,msg:'增加失败'})
  })
})
// 渲染接口
app.get("/show",(req,res)=>{
  zy.find().then(data=>{
    res.send(data)
  })
})
// 删除接口
app.post("/del",(req,res)=>{
  zy.findOneAndDelete({_id:req.body.id}).then(data=>{
    data?res.send({status:1,msg:'删除成功'}):res.send({status:0,msg:'删除失败'})
  })
})
// 修改反显接口
app.get("/editshow",(req,res)=>{
  zy.find({_id:req.query.id}).then(data=>{
    res.send(data)
  })
})
// 确认修改接口
app.get("/confirmedit",(req,res)=>{
  zy.updateOne({_id:req.query.id},{username:req.query.username,age:req.query.age,sex:req.query.sex}).then(data=>{
    data.ok==1?res.send({status:1,msg:'修改成功'}):res.send({status:0,msg:'修改失败'})
  })
})
app.listen("8080", () => {
  console.log("欢迎访问8080服务器");
});
