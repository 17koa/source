const mongoose = require("mongoose")

mongoose.Promise = require('bluebird')

// 核心代码，是否开启测试
mongoose.set('debug', true)

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

const db = mongoose.connect("mongodb://127.0.0.1:27017/db_helloworld", options) 

// db.connection.on("error", function (error) {  
//   console.log("数据库连接失败：" + error) 
// }) 

// db.connection.once('open', function() {
//   // we're connected!
//   console.log("数据库连接成功")
//   mongoose.connection.db.dropDatabase()
// });
