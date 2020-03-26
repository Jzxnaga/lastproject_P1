const Model = require('../models')
const Review = Model.Review
const Movie = Model.Movie


class ReviewController {
  static editPost(req, res) {
    let restaurantId
    Review.findByPk(req.params.id)
    .then(review => {
    restaurantId = review.dataValues.ReviewId
      return Review
      .update({
        review: req.body.review,
        rating: req.body.rating
      }, {
        where: {
          id: req.params.id
        }
      })
    })
    .then(updated => {
      res.redirect(`/restaurants/${restaurantId}`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }

  static delete(req, res) {
    let restaurantId
    Review.findByPk(req.params.id)
    .then(review => {
      console.log(review)
      restaurantId = review.dataValues.ReviewId
      return Review
      .destroy({
        where: {
          id: req.params.id
        }
      })
    })
    .then(deleted => {
      res.redirect(`/restaurants/${restaurantId}`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }
}

module.exports = ReviewController