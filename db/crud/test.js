import test from 'ava'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

mongoose.Promise = require('bluebird')

// 定义Schema
const UserSchema = new mongoose.Schema({
  username: {// 真实姓名
    type: String,
    required: true
  },
  password: { // 密码
    type: String,
    required: true
  }
});

// 定义Model
const User = mongoose.model('User', UserSchema);

// 定义`user` Entity
let user = new User({
  username: 'i5ting',
  password: '0123456789'
})

// Start MongoDB instance
const mongod = new MongodbMemoryServer()

// Create connection to Mongoose before tests are run
test.before(async () => {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  })
})

test.beforeEach(async () => {
  user = await user.save()
})

test.after(() => User.remove())

test.serial('#find() return array', async (t) => {
  const users = await User.find({})
  t.true(users instanceof Array)

  const _user1 = await User.findOne({ username: 'i5ting' })
  t.true(_user1.username === 'i5ting')
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

test.serial('#findOneAndUpdate()', async t => {
  try {
    const result = await user.update({ username: 'i5ting for update' })
    const _user = await User.findById(user._id)
    t.is(_user.username, 'i5ting for update')
  } catch (error) {
    t.ifError(error)
  }
})

test.serial('#remove() return array', async (t) => {
  await User.remove({})
  const _user1 = await User.findOne({ username: 'i5ting' })

  t.true(_user1 === null)
})
