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
      Restaurant.findByPk(idRestaurant, {include:{model:Review}
      })
      .then(data=>{
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
    // let restaurant;
    // let userId;
    // User.findOne({
    //   where: {
    //     username: req.session.user.name
    //     }
    //   })
    //   .then(user => {
    //     userId = user.dataValues.id
    //     return Restaurant
    //     .findByPk(req.params.id, {include: [
    //       {
    //         model: Review,
    //         include: [User]
    //       }
    //     ]})
    //   })
    //   .then(foundRestaurant => {
    //     restaurant = foundRestaurant
    //     return Restaurant.getAverageRating()
    //   })
    //   .then(averageRating => {
    //     restaurant.setDataValue('averageRating', averageRating)
    //     return Review
    //     .findOne({
    //       where: {
    //         RestaurantId: restaurant.id,
    //         UserId: userId
    //       }
    //     })
    //   })
    //   .then(loggedUserReview => {
    //     res.render('restaurantsreviews', {Restaurant, err:req.query.err, loggedUserReview})
    //   })
    //   .catch(err => {
    //     res.send(err.message)
    //     // res.redirect(`/movies/${req.params.id}?err=${err.message}`)
    // })
    }

    static addReview (req, res) {
      Restaurant
      .findByPk(req.params.id)
      .then(data => {
        res.render('restaurantsreviews', {data, err:req.query.err})
      })
      .catch(err => {
        res.redirect(`/restaurants/${req.params.id}?err=${err.message}`)
      })
    }


//// ini kolom add ngebentuk database  tabel review ////

    static addReviewPost (req, res) {
      let userId
      User.
      findOne({
        where: {
          username: req.session.user.name
        }
      })
      .then(user => {
        userId = user.dataValues.id
        return Review
        .create({
          UserId: userId,
          RestaurantId: req.params.id,
          reviewTitle: req.body.review,
          rating: req.body.rating
          
        })
      })
      .then(created => {
        res.redirect(`/restaurants/${req.params.id}`)
      })
      .catch(err => {
        res.redirect(`/restaurants/${req.params.id}/add-review/?err=${err.message}`)
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