const routes = require('express').Router();
const RestaurantsController = require('../controllers/RSController')
const controllerAuth = require('../controllers/AuthController.js')
const ReviewsController = require('../controllers/RWController')

const cekLogin = function (req, res, next){
  
  if(!req.session.user){
    console.log(err)
    res.redirect(`/login`)
  } else {
    next()
  }
}


routes.get('/login', (req, res) =>{
  // res.send('testlogin')
  res.render ('login', {err:req.query.err})
})
routes.post('/login', controllerAuth.login)

/// masukin ke kolom registrasi view register ///
routes.get('/register', (req,res) =>{
  res.render('register', {err:req.query.err})
})
routes.post('/register', controllerAuth.register)

routes.get('/',(req,res)=>{
  res.render('home')
})

routes.get('/restaurant',cekLogin, RestaurantsController.findAll)


routes.get('/logout', (req, res) =>{
  req.session.destroy(function (err){
    res.redirect('/')
  })
})

// yang dibawah ini menuju restaurants semua //
routes.get('/restaurant/:id', cekLogin, RestaurantsController.findOneWithReviews)

routes.get('/Restaurants/:id/add-review', cekLogin, RestaurantsController.addReview)
routes.post('/Restaurants/:id/add-review', cekLogin, RestaurantsController.addReviewPost)

routes.get('/Restaurants/:id/edit-review', cekLogin, RestaurantsController.editReview)



/// ini berubah di kolom review ///
routes.post('/reviews/:id/edit', cekLogin, ReviewsController.editPost)
routes.get('/reviews/:id/delete', cekLogin, ReviewsController.delete)



//// uda si segini aja ga ribetss////
module.exports = routes