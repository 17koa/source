import test from 'ava'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

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
  user = await user.save()
})

// test.afterEach.always(() => User.remove())
test.after(() => User.remove())

test.serial('#findById() return one', async t => {
  try {
    const _user1 = await User.findOne({ username: 'i5ting' })

    const _user = await User.findById(_user1._id)

    t.is(_user.username, 'i5ting')
  } catch (error) {
    t.ifError(error)
  }
})

test.serial('#find() return array', async (t) => {
  const users = await User.find({})
  t.true(users instanceof Array)

  const _user1 = await User.findOne({username: 'i5ting' })
  console.log(_user1)
  t.true(_user1.username === 'i5ting')
})

test.serial('#findByIdAndUpdate()', async (t) => {
  // console.log(user._id)

  const _user1 = await User.find({ username: 'i5ting'})
  console.log(_user1)

  // const newUser = await User.findByIdAndUpdate(user._id, {
  //   username: 'sang'
  // })

  // console.log(newUser)
  // t.true(newUser.username === 'sang')
})


test.serial('#remove() return array', async (t) => {
  const result = await User.remove({})
  // console.log(result.result)
  const _user1 = await User.findOne({ username: 'i5ting' })

  t.true(_user1 === null)
})

// test.cb('#findByIdAndUpdate()', t => {

//   _user.save((err, u) => {
//     t.is(u.username, 'i5ting for update 1');

//     User.findByIdAndUpdate(u._id, {
//       username: 'sang'
//     }, (err, user) => {
//       t.ifError(err);
//       t.is(user.username, 'sang');
//       t.end()
//     });
//   });
// });
