const {Restaurant , User} = require ('../models/index')
 



class RestaurantsController {

    static findAll(req,res) {
      Restaurant.findAll({
        include : [{model:User}]
      })
      .then(data=>{
        res.send(data)
      })
      .catch(err=>{
        res.send(err)
        console.log(err)
      })
    }




}
  module.exports = RestaurantsController