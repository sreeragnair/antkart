var express = require('express');
var router = express.Router();
var auth = require("../controller/AuthController.js");

/* GET home page. */
/*router.get('/', function(req, res) {
//res.redirect("/api/productinfo");
res.render("indexzz.html")
});
*/

router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post("/api/register", auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post("/api/login", auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;
