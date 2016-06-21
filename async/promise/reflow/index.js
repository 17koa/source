var tasks = require('./tasks')

tasks.hello('./package.json').then(tasks.step1).then(tasks.step2).catch(function(err) {
  console.log(err)
})

// tasks.hello('./package.json').then(tasks.step2).then(tasks.step1).catch(function(err) {
//   console.log(err)
// })
