const {Restaurant , User , Review} = require ('../models/index')
 



class RestaurantsController {

    static findAll(req,res) {
      Restaurant.findAll({
        include : [{model:User}]
      })
      .then(data=>{
        let user=req.session.user
        res.render("restaurants",{data,user,err:req.query.err})
      })
      .catch(err=>{
        res.redirect(`/restaurants?err=${err.message}`)
        console.log(err)
      })
    }

    static findOneWithReviews(req,res){
      const idRestaurant = req.params.id
      
      Restaurant.findByPk(idRestaurant , {include:{model:User}
      })
      .then(data=>{
        console.log(req.session.name)//inituh username
        res.render('reviews',{data})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static addReview (req, res) {
      Restaurant.findByPk(req.params.id)
      .then(data => {
        // console.log(data.dataValues)
        res.render('addingreviews', {data : data.dataValues, err:req.query.err})
      })
      .catch(err => {
        res.redirect(`/restaurants/${req.params.id}?err=${err.message}`)
      })
    }


//// ini kolom add ngebentuk database  tabel review ////

    static addReviewPost (req, res) {
      console.log(req.params.id)
      console.log(req.body.review)
      console.log(req.session.user.name)
      
      let userId
      User.findOne({
        where: {
          username: req.session.user.name
        }
      })
      .then(user => {
        userId = user.dataValues.id
        return Review
        .create({
          RestaurantId: req.params.id,
          UserId: userId,
          review: req.body.review,
          rating: Number(req.body.rating)
          
        })
      })
      .then(created => {
        res.redirect(`/restaurant/${req.params.id}`)
      })
      .catch(err => {
        res.redirect(`/restaurant/${req.params.id}/add-review/?err=${err.message}`)
      })
    }

    static editReview (req, res) {
      console.log()
      let restaurant
      Restaurant
      .findByPk(req.params.id)
      .then(foundRestaurant => {
        restaurant = foundRestaurant
        return Review
        .findOne({
          where: {
            RestaurantId: movie.id,
            UserId: 1
          }
        })
      })
      .then(review => {
        console.log(review)
        res.render('restaurants-edit-review', {restaurant, review, err:req.query.err})
      })
      .catch(err => {
        res.send(err.message)
      })
    }
}
  module.exports = RestaurantsController