import test from 'ava'

global.Promise = require('bluebird')
var Promise = require("bluebird");
// 1、引入`mongoose connect`
require('../mini/connect')

// 2、引入`User` Model
const User = require('../mini/user')

const ClearAll = function(){
  return new Promise(function (resolve, reject) {
    User.remove({}, function(err, doc){
      if (err) reject(err)
      resolve()
    })
  })
}

// 3、定义`user` Entity
let user = new User({
  username: 'i5ting',
  password: '0123456789'
})

global.log = console.log

test.cb('#save()', t => {
  ClearAll({}).then(function () {
    return user.save()
  }).then(function (u) {
    t.is(u.username, 'i5ting')
    t.end()
  }).catch(function (err) {
    t.ifError(err)
    t.end()
  })
})

test.cb('#find()', t => {
  let user2 = new User({
    username: 'koa',
    password: '0123456789'
  })

  ClearAll({}).then(function () {
    return Promise.all([user.save(), user2.save()])
  }).then(function () {
    return User.find({})
  }).then(function (users) {
    t.true(users.length == 2)
    console.log( users)
    t.true(users instanceof Array)
    t.end()
  }).catch(function (err) {
    t.ifError(err)
    t.end()
  })
})

test.cb('#find() 2', t => {
  ClearAll({}).then(function () {
    return user.save()
  }).then(function () {
    return User.find({})
  }).then(function (users) {
    t.true(users.length == 2)
    console.log( users)
    t.true(users instanceof Object)
    t.end()
  }).catch(function (err) {
    t.ifError(err)
    t.end()
  })
})

// test.cb('#findById() return one', t => {
//   let _user = new User({
//     username: 'i5ting for findById',
//     password: '01234567891'
//   })

//   ClearAll().then(
//     Promise.all(user.save(), _user.save())
//   ).then((u) => {
//     if (err) log(err)
//     t.is(u.username, 'i5ting for findById')

//     User.findById(u._id, (err, doc) => {
//       t.ifError(err)
//       t.is(doc.username, 'i5ting for findById')
//       t.end()
//     })
//   })
// })

// test.cb('#findOne() return user obj', t => {
//   User.findOne({username: 'i5ting'}, (err, doc) => {
//     t.ifError(err)
//     console.log(doc.username)
//     t.is(doc.username, 'i5ting')
//     t.end()
//   })
// })

// test.cb('#remove()', t => {
//   const _user = new User({
//     username: 'i5ting for delete',
//     password: '0123456789'
//   })

//   _user.save((err, u) => {
//     t.is(u.username, 'i5ting for delete')

//     User.remove({username: 'i5ting for delete'}, (err, doc) => {
//       t.ifError(err)
//       t.is(doc.result.ok, 1)
//       t.is(doc.result.n, 1)
//       t.end()
//     })
//   })
// })


// test.cb('#findByIdAndUpdate()', t => {
//   const _user = new User({
//     username: 'i5ting for update 1',
//     password: '0123456789'
//   })

//   _user.save((err, u) => {
//     t.is(u.username, 'i5ting for update 1')

//     User.findByIdAndUpdate(u._id, {
//       username: 'sang'
//     }, (err, user) => {
//       t.ifError(err)
//       t.is(user.username, 'sang')
//       t.end()
//     })
//   })
// })

// test.cb('#findOneAndUpdate()', t => {
//   const _user = new User({
//     username: 'i5ting for update 2',
//     password: '0123456789'
//   })

//   _user.save((err, u) => {
//     t.is(u.username, 'i5ting for update 2')
//       })

//     User.findOneAndUpdate({
//       username: 'i5ting for update 2'
//     }, {
//       username: 'sang'
//     }, (err, user) => {
//       t.ifError(err)
//       t.is(user.username, 'sangsdsd')
//       t.end()
//   })
// })
