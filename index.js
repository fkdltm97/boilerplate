const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const config =require("./config/key")

const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//DB연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then( ()=>console.log('mongoDB connected...') )
.catch(err=>console.log(err))




app.get('/', (req,res)=>{
    res.send('Hello World!!! 집에 가즈아')
});

//회원 가입 라우트
app.post('/register',(req,res)=>{
    //회원 가입 할떄 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    
    const user = new User(req.body)

    user.save((err,useInfo)=>{
        if(err) return res.json({success : false,err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, ()=>console.log('express 연결'+port))