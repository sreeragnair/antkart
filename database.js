var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var imgPath = './public/images/test.jpg';
var product = new Schema(
  {productid : String,
  productname : String,
  catid:String,
  qty:Number,
  productprice : String,
  photo: String 
}
);

mongoose.model('products', product);

mongoose.connect('mongodb://localhost/antcart');