import test from 'ava'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

global.Promise = require('bluebird')
// 1、引入`mongoose connect`
require('../mini/connect')

// 2、引入`User` Model
const User = require('../mini/user')

// 3、定义`user` Entity
let user = new User({
  username: 'i5ting',
  password: '0123456789'
})

// Start MongoDB instance
const mongod = new MongodbMemoryServer()

// Create connection to Mongoose before tests are run
test.before(async () => {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, { useMongoClient: true })
})

test.beforeEach(async () => {
  await user.save()
})

// test.afterEach.always(() => User.remove())
test.afterEach(async () => {
  // This runs after each test and other test hooks, even if they failed
  await User.remove()
})

test.serial('#findById() return one', async t => {
  try {
    const _user1 = await User.findOne({ username: 'i5ting' })

    const _user = await User.findById(_user1._id)

    t.is(_user.username, 'i5ting')
  } catch (error) {
    t.ifError(error)
  }
})

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

test.serial('#find() return array', async (t) => {
  const users = await User.find({})
  t.true(users instanceof Array)
})

test.serial('#remove() return array', async (t) => {
  // console.log( isPromise(User.remove))

  // const r = require('bluebird').promisify(User.remove)
  // const result = await r({})
  // console.log(result.result)

  User.remove({}, async function(err, users) {
    console.log(users)
    const _user1 = await User.findOne({ username: 'i5ting' })
  

    t.true(_user1 === null)
  })
  
})




