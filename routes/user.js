const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelper=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.userLoggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}


router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user);
  productHelper.getAllProducts().then((products)=>{
    res.render('user/view_product_client',{products,user})
  })

});


// router.get('/',async function(req, res,next) {
//   let user=req.session.user
//   let cartCount=null
//   if(req.session.user){
//    cartCount= await userHelpers.getCartCount(req.session.user._id)
//   }
//   // let smartPhone= await productHelper.getSmartphone()
//   // let laptop= await productHelper.getLaptop()
//   // let Hearphone= await productHelper.getHearphone()
//   productHelper.getAllProducts().then((products)=>{
//     console.log(cartCount);
//     res.render('user/view_product_client',{products,user}  );
//   })
// });






router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else
  res.render('user/login',{'loginErr':req.session.userLoginErr})
  req.session.userLoginErr=false
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
   userHelpers.doSignup(req.body).then((response)=>{
   console.log(response);
   req.session.loggedIn=true
   req.session.user=response
   res.redirect('/')
   })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      // req.session.userLoggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }
    else
    {
      req.session.userLoginErr=true
      // res.session.loginErr=true
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

//Cart

// router.get('/cart',verifyLogin,async(req,res)=>{
  
//   let products=await userHelpers.getCartProducts(req.session.user._id)
//  let totalValue=0
//  if(products.length>0){
//    totalValue=await userHelpers.getTotalAmount(req.session.user._id)
//  }
  
// router.get('/add-to-cart/:id',(req,res)=>{
//   userHelpers.addToCart(req.params.id,req.session.user._id)
// })

router.get('/cart',(req,res)=>{
  res.render('user/cart')
})



router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    // res.redirect('/')
    res.json({status:true})
    console.log(res.json);
  })
})


module.exports = router;




