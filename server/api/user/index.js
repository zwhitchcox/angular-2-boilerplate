'use strict'
const express     = require('express');
const router      = express.Router();
const jwt         = require('jsonwebtoken')
const _           = require('lodash')
const config      = require('../../config/environment/development')
const isAuth      = require('./is-auth')
const client = require('../../api/utils/stormpath').client
const USER_SCHEMA = [
  'givenName',
  'surname',
  'email',
  'username',
  'password',
  'customData',
  'href'
]
const CUSTOM_DATA_SCHEMA = [
  'company'
]
router
  .post('/authenticate', authenticate)
router
  .post('/register', register)
router
  .post('/reset', reset)
router
  .post('/update',isAuth, update)

function authenticate(req, res) {
  let authRequest = {
    username: req.body.username,
    password: req.body.password
  }
  require('../utils/stormpath')
    .app
    .then((app) => {
      app
        .authenticateAccount(authRequest, (err, user) => {
          if (err)
            res
              .status(401)
              .send('User not authenticated')
          else
            user
              .getAccount((err, user) => {
                if (err)
                  res
                    .status(401)
                    .send('User not authenticated')
                else
                  if (err)
                    res
                      .status(401)
                      .send('User not authenticated')
                  else
                    user
                      .getCustomData((err,customData) => {
                        user = _.pick(user,USER_SCHEMA)
                        user.customData = _.pick(customData,CUSTOM_DATA_SCHEMA)
                        res
                          .status(200)
                          .send(jwt.sign(user,config.secret)) 
                      })
            })
        })
    })
}
function register(req, res) {
  let account = _.pick(req.body, USER_SCHEMA)
  account.customData = _.pick(account.customData, CUSTOM_DATA_SCHEMA)
  require('../utils/stormpath')
    .app
    .then((app) => {
      app
        .createAccount(account, (err, user) => {
          if (err) {
            console.error(err)
            res
              .status(401)
              .send(err.userMessage)
          }
          else user
            .getCustomData((err,customData) => {
              if (err) {
                console.error(err)
                res
                  .status(401)
                  .send(err.userMessage)
              }
              else {
                user = _.pick(user,USER_SCHEMA)
                user.customData = _.pick(customData,CUSTOM_DATA_SCHEMA)
                res
                  .status(200)
                  .send(jwt.sign(user,config.secret))
              }
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

function reset(req, res) {     
  if (req.body.email) {
    let email = req.body.email   
    require('../utils/stormpath')
      .app
      .then((app) => {           
        app
          .sendPasswordResetEmail({email:email}, (err, passwordResetToken) => {
            if (err) {
              res.status(400).end('Oops!  There was an error: ' + err.userMessage)
            } else {             
              res.status(200).end('Please check your email for a link to set a new password.')
            }
          })
      })
      .catch((err) => {          
        console.log(err)         
        res.status(400).end('Oops!  There was an error')
      })
  } else {
    let password = req.body.password
    let token    = req.body.token
    require('../utils/stormpath')
      .app
      .then((app) => {
        app
          .resetPassword(token, password, (err, result) => {
            if ( err) {
              console.log(err)
              res
                .status(400)
                .end('Oops! There was an error: ' + 
                  err.userMessage)
            } else {
              client.getAccount(result.account.href, (err, account) => {
                account.getCustomData((err,customData) => {
                  let user = _.pick(account, USER_SCHEMA)
                  user.customData = 
                    _.pick(customData, CUSTOM_DATA_SCHEMA)
                  res
                    .status(200)
                    .send(jwt.sign(user,config.secret))
                })
              })
            }
        })
      })
  }
} 

function update(req,res) {
  let newUserData = _.pick(req.body,USER_SCHEMA)
  let newCustomData = _.pick(req.body.customData, CUSTOM_DATA_SCHEMA)
  req.user = Object.assign(req.user,newUserData)
  req.user.customData = Object.assign(req.customData, newCustomData)
  req.user.save((err) => {
    if (err) {
      res.status(400).end('Oops!  There was an error: ' + err.userMessage)
    } else {
      let user = _.pick(req.user, USER_SCHEMA)
      user.customData = _.pick(user.customData,CUSTOM_DATA_SCHEMA)
      res
        .send(jwt.sign(user,config.secret)) 
    }
  })
}

module.exports = router
