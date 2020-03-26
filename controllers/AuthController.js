const {User} = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
    static register (req,res) {
      User.findOrCreate ({
        where:{
          username: req.body.username,
          password: req.body.password
        }
      })
      .then (([user, created])=>{
        if (created) {
          res.redirect('/movies')
        }
      })
      .catch (err =>{
        res.redirect(`/register?err=${err.message}`)
      })
    }

    //jika dia login//
  
    static login (req, res) {
      // res.send('uda masuk login nih')
      User.findOne ({
        where: {
          username: req.body.username
        }
      })
      .then ((user)=>{
        const password = req.body.password
        bcrypt.compare(password, user.password)
        .then(pass => {
          req.session.user = {
            name: user.username
          }
          
          res.redirect('/restaurant')
        });
      })
      .catch (err =>{
        res.redirect (`/login?err=${err.message}`)
      })
    }
  }
  
  module.exports = AuthController
  