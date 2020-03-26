const routes = require('express').Router();
const RestaurantsController = require('../controllers/RSController')
const controllerAuth = require('../controllers/AuthController.js')
const ReviewsController = require('../controllers/RWController')

const cekLogin = function (req, res, next){
  if(!req.session.user){
    res.redirect(`/login`)
  } else {
    next()
  }
}

routes.get('/', RestaurantsController.findAll)

routes.get('/rest', RestaurantsController.findAll)

/// masukin ke kolom registrasi view register ///
routes.get('/register', (req,res) =>{
  res.render('register', {err:req.query.err})
})

routes.post('/register', controllerAuth.register)
routes.get('/login', (req, res) =>{
  res.render ('login', {err:req.query.err})
})

routes.post('/login', controllerAuth.login)

routes.get('/logout', (req, res) =>{
  req.session.destroy(function (err){
    console.log('ceklogout')
    res.redirect('/Restaurants')
  })
})

// yang dibawah ini menuju restaurants semua //
routes.get('/Restaurants/:id', cekLogin, RestaurantsController.findOneWithReviews)

routes.get('/Restaurants/:id/add-review', cekLogin, RestaurantsController.addReview)
routes.post('/Restaurants/:id/add-review', cekLogin, RestaurantsController.addReviewPost)

routes.get('/Restaurants/:id/edit-review', cekLogin, RestaurantsController.editReview)



/// ini berubah di kolom review ///
routes.post('/reviews/:id/edit', cekLogin, ReviewsController.editPost)
routes.get('/reviews/:id/delete', cekLogin, ReviewsController.delete)



//// uda si segini aja ga ribetss////
module.exports = routes