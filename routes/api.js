var express = require('express');
var router = express.Router();
var multer = require('multer');
//var datas = require('../ordersdb.js');

var mongoose = require('mongoose');
var product = mongoose.model('products');

var cat = mongoose.model('cats');

var order = mongoose.model('orders');
var auth = require("../controller/AuthController.js");

/*var User=require('../User');




router.post('/login',function(req,res,next){
  console.log(req.body);
  var username=req.body.username;
  var password=req.body.password;
 
User.findOne({username:username,password:password},function(err,user){

  if (user.username=="admin" && user.password=="admin"){
   
      res.redirect( "/api/productinfo");

    }


  if (err){
    console.log(err);
    return res.status(500).send();
  } 
 

  if (!user){
    return res.status(404).send();

  }
  
 //res.redirect("/api/userview");
 //res.redirect(200, '/api/userview');
   
 //return res.status(200).send() ;
 if (user.username!="admin" && user.password!="admin"){
 res.redirect("/api/userview");
 }
 })

})
router.post("/register",function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var newuser=new User();
  newuser.username=username;
  newuser.password=password;
  newuser.firstname=firstname;
  newuser.lastname=lastname;

newuser.save(function(err,savedUser){
  if(err){
    console.log(err);
    return res.status(500).send();
  }
  //return res.status(200).send();
//res.render('success');
res.redirect("/");

})

})
*/
























//multer config
const multerConfig = {
    
  storage: multer.diskStorage({
   //Setup where the user's file will go
   destination: function(req, file, next){
     next(null, './public/photo-storage');
     },   
      
      //Then give the file a unique name
      filename: function(req, file, next){
          console.log(file);
          const ext = file.mimetype.split('/')[1];
          next(null, file.fieldname + '-' + Date.now() + '.'+ext);
        }
      }),   
  //A means of ensuring only images are uploaded. 
      fileFilter: function(req, file, next){
            if(!file){
              next();
            }
          const image = file.mimetype.startsWith('image/');
          if(image){
            console.log('photo uploaded');
            next(null, true);
          }else{
            console.log("file not supported");
            
            //TODO:  A better message response to user on failure.
            return next();
          }
      }
    };
  






//

router.get("/productinfo", function(req, res) {
  //var products=product.find();
  //var cats=cat.find();
  var List1 = mongoose.model('products');
  var List2 = mongoose.model('cats');
  var List3 = mongoose.model('orders');

  List1.find(function (err, products) {
    List2.find(function (err, cats) {
      List3.find(function (err, orders) {

        res.render('dash', {
            products : products,
            cats : cats,
           orders : orders

        })
      
        })
      })
    })
    })



 /*   product.find(function(err, products) {

      res.render(
        'dash',
        {title:'productapi', products : products})
    })
  })*/
//admin pro list neww
router.get("/adminprolist",function(req,res){
  
  var List1 = mongoose.model('products');

  List1.find(function (err, products) {

    res.render(
      'kartproff',
      {title:'productapi', products : products, user : req.user })
  })
})

 //admin catlist-new
 router.get("/admincatlist",function(req,res){
  
  var List1 = mongoose.model('cats');

  List1.find(function (err, cats) {

    res.render(
      'catproff',
      {title:'productapi', cats : cats, user : req.user })
  })
})

//admin orders list new

router.get("/adminorderlist",function(req,res){
  
  var List1 = mongoose.model('orders');

  List1.find(function (err, orders) {

    res.render(
      'orderproff',
      {title:'productapi', orders : orders, user : req.user })
  })
})






  //auth product view only
router.get("/userview",function(req,res){
  
  var List1 = mongoose.model('products');

  List1.find(function (err, products) {

    res.render(
      'karthome',
      {title:'productapi', products : products, user : req.user })
  })
})


//add to cart view



router.get('/addkart/:id', function(req, res) {
  var query = {"_id": req.params.id};
  product.findOne(query, function(err, product){
    res.render(
      'addtokart',
      {title : 'update info - ' , product :product}
    );
  });
});

///placin order


router.post('/ordernow', function(req, res) {

var sree={"productname" : req.body.productname,"productid" : req.body.productid,"productprice" : req.body.productprice,"customername":req.body.customername,"customeraddress":req.body.customeraddress}
 
  new order(sree)
  .save(function(err, order) {

    res.redirect("/api/userview");
  });
});





router.get("/additem",function(req,res){
res.render("addproform");
})





  
  router.post('/productinfo',multer(multerConfig).single('photo'), function(req, res) {
    var sree={"productid" : req.body.productid,"productname" : req.body.productname,"catid":req.body.catid,"qty":req.body.qty,"productprice" : req.body.productprice,"photo":req.file.filename}
   console.log(req.file);
    new product(sree)
    .save(function(err, product) {
      
      res.redirect("/api/productinfo");
    });
  });
//update to get row value 
  router.get('/product/:id', function(req, res) {
    var query = {"_id": req.params.id};
    product.findOne(query, function(err, product){
      res.render(
        'modify',
        {title : 'update info - ' , product :product}
      );
    });
  });

//please check this part//

  router.put('/product/:id',multer(multerConfig).single('photo'),  function(req, res) {
    var query = {"_id": req.params.id};
    var update = {'productid':req.body.productid,'productname':req.body.productname,'catid':req.body.catid,'qty':req.body.qty,'productprice':req.body.productprice,"photo":req.file.filename};
    var options = {new:true};
    product.findOneAndUpdate(query, update, options, function(err, product){
      console.log(product)
        //res.redirect('/api/productinfo');

        res.redirect('/api/productinfo');
      //res.redirect('/api/productinfo');

    });
  });
  router.delete('/product/:id', function(req, res) {
    var query = {"_id": req.params.id};
    product.findOneAndRemove(query, function(err, product){
      console.log(product)
      res.redirect('/api/productinfo');
    });
  });
 //cat section


 router.get("/addcat",function(req,res){
  res.render("addcatform");
  })
  
 router.get("/addproduct",function(req,res){
  res.render("addproform");
  })
  



router.get("/catinfo", function(req, res) {
  cat.find(function(err, cats){
   // res.render(
     // 'catdash',
      //{title : ' product api', cats : cats}
    res.redirect('/api/productinfo')
  });
  });
//})
 
  router.post('/catinfo',function(req, res) {
    var sree={"catid" : req.body.catid,"catname" : req.body.catname}
    new cat(sree)
    .save(function(err, cat) {
      
      res.redirect("/api/catinfo");
    });
  });
 
 
 
 
  router.get('/cat/:id', function(req, res) {
    var query = {"_id": req.params.id};
    cat.findOne(query, function(err, cat){
      res.render(
        'modifycat',
        {title : 'update info - ' , cat :cat}
      );
    });
  });

//please check this part//

  router.put('/cat/:id',function(req, res) {
    var query = {"_id": req.params.id};
    var update = {'catid':req.body.catid,'catname':req.body.catname};
    var options = {new:true};
    cat.findOneAndUpdate(query, update, options, function(err, product){
      //console.log(cat)
        //res.redirect('/api/productinfo');

       // res.redirect("/userview");
      res.redirect('/api/productinfo');

    });
  });
  router.delete('/cat/:id', function(req, res) {
    var query = {"_id": req.params.id};
    cat.findOneAndRemove(query, function(err,cat){
      console.log(cat)
  //    res.redirect("/userview");
      res.redirect('/api/productinfo');
    });
  });
 
  module.exports = router;




