var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
//var imgPath = './public/images/test.jpg';
var order = new Schema(
  { productname : String,
   productid : String,
  productprice:String,
  customername:String,
  customeraddress:String
  }
  );
mongoose.model('orders', order);
mongoose.connect('mongodb://localhost/antcart');






