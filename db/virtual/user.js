var mongoose = require('mongoose');

// 定义Schema
UserSchema = new mongoose.Schema({
  username: {// 真实姓名
    type: String,
    required: true
  },
  password: { // 密码
    type: String,
    required: true
  },
  invite_code   : String, // 邀请码
  phone_number  : Number, // 电话号码
  created_at    : {
    type: Date,
    "default": Date.now
  }
});

UserSchema.virtual('is_valid').get(function(){
  if(this.phone_number == undefined | this.invite_code == undefined){
    return false;
  }
  return this.invite_code.length >= 2 && this.phone_number > 10000000
});

// 定义Model
var UserModel = mongoose.model('User', UserSchema);

// 暴露接口
module.exports = UserModel;
