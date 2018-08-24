var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
//var imgPath = './public/images/test.jpg';
var cat = new Schema(
  {catid : String,
  catname : String
 
}
);

mongoose.model('cats', cat);

mongoose.connect('mongodb://localhost/antcart');