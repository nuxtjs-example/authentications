const mongoose = require('mongoose')
const Schema = mongoose.Schema
const randToken = require('rand-token')

const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const schema = new Schema({
  firstName: { type: String, required: true },
  familyName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true, default () { return randToken.generate(16) } },
  // status: { type: Number, enum: [0, 1], required: true, default: 0 }, // 0 belum aktivsi, 1 aktif
  from: { type: String, enum: ['local', 'google'], default: 'local' },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
})

schema.set('timestamps', true)

schema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) { return next() }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) { return next(err) }

      user.password = hash
      next()
    })
  })
})

// schema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err)
//     cb(null, isMatch)
//   })
// }

schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) { reject(err) }
      resolve(isMatch)
    })
  })
}

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v
    ret.id = ret._id.toString()
    delete ret._id
  }
})

schema.set('toObject', {
  virtuals: true
})

module.exports = mongoose.model('User', schema)
