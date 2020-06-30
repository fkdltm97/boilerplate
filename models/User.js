const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
//saltRounds는 salt가 몇 글자인지를 나타낸다.
//salt롤 비밀번호를 암호화한다.
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password:{
        type : String,
        minlength:5
    },
    lastname:{
        type : String,
        maxLength:50
    },
    role:{
        type:Number,
        default : 0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){

        //비밀번로를 암호화 시킨다.
        //gensalt = salt를 만든다.
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err)return next(err)
            
            bcrypt.hash(user.password , salt , function(err,hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})
// 비밀 번호 확인 - 암호화된
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password , function(err,isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
   bcrypt.compare(plainPassword, this.password, function(err,isMatch){
       if(err) return cb(err),
       cb(null, isMatch)
   })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwebtoken을 이욯해서 token가져오기
    var token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }