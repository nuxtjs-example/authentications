const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const registeredUser = await User.findOne({ email: req.body.email }).exec()
    if (!registeredUser) {
      const user = new User({ ...req.body })
      await user.save()
      res.status(200).send({ status: true, user })
    } else {
      res.status(400).send({
        status: false,
        message: 'Account already exist.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: 'Internal server error.'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec()
    if (user) {
      if (await user.comparePassword(req.body.password)) {
        const token = jwt.sign({
          email: user.email,
          firstName: user.firstName,
          familyName: user.familyName
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
        res.status(200).send({
          status: true,
          accessToken: token
        })
      } else {
        res.status(401).send({
          status: false,
          message: 'Invalid email or password.'
        })
      }
    } else {
      res.status(404).send({
        status: false,
        message: 'Account not found.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: 'Internal server error.'
    })
  }
})

router.get('/currentUser', async (req, res) => {
  try {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const decodeResult = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return { error: true, ...err }
      }
      return { error: false, user: decoded }
    })
    if (!decodeResult.error) {
      res.status(200).send({
        status: true,
        user: decodeResult.user
      })
    } else {
      res.status(401).send({
        status: false,
        message: 'Unauthorized account.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: 'Internal server error.'
    })
  }
})

module.exports = router
