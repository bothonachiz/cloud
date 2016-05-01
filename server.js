var express = require('express')
var body = require('body-parser')
var app = express()
var json = body.json()

var mongoose = require('mongoose')
mongoose.connect('mongodb://adminpos:1234@ds023000.mlab.com:23000/pos')

var Cat = mongoose.model('customers', { cid: String, name: String })

// var kitty = new Cat({ cid: '001', name: 'Bothon' })
// kitty.save(function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('meow')
//   }
// })

app.use(express.static('public'))

app.delete('/readvalue', function (req, res) {
  Cat.find(function (err, data) {
    if (err) return console.error(err)
    res.send(data)
  })
})

app.post('/readvalue', json, function (req, res) {
  console.log(req.body)
  res.send(req.body)
})

// Cat.remove({ cid: '001'}, function (err) {
//   if (err) // ...
//     console.log(err)
// })

app.get('/readvalue', function (req, res) {
  Cat.find(function (err, data) {
    if (err) return console.error(err)
    res.send(data)
  })
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
