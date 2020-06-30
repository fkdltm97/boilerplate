const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://gkdlvp97:142857@cluster0-nc7tk.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then( ()=>console.log('mongoDB connected...') )
.catch(err=>console.log(err))


app.get('/', (req,res)=>{
    res.send('Hello World!!! 가즈아')
});


app.listen(port, ()=>console.log('express 연결'+port))