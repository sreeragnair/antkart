var mongoose = require('mongoose');
//var Schema   = mongoose.Schema;

var userSchema =new mongoose.Schema({
      username:{type:String,unique:true},
      password: {type:String},
      firstname:String,
      lastname:String,
      role :String,
    });
    var User= mongoose.model('myuser',userSchema );
    mongoose.connect('mongodb://localhost/antcart');
    module.exports=User;

