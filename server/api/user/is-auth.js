'use strict'
const jwt         = require('jsonwebtoken')
const _           = require('lodash')
const config      = require('../../config/environment/development')

function isAuth(req,res,next) {
  if (req.user !== undefined)
    next()
  else
    res
      .status(401)
      .send('Must be logged in to see this!')
}

module.exports = isAuth
