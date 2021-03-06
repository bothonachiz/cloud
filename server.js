var express = require('express')
var body = require('body-parser')
var app = express()
var json = body.json()

var mongoose = require('mongoose')
mongoose.connect('mongodb://adminpos:1234@ds023000.mlab.com:23000/pos')
app.use(express.static('public'))

var Cat = mongoose.model('products', {pid: String, pname: String, pprice: Number})

app.post('/value', json, function (req, res) {
  var newData = new Cat(req.body)
  newData.save(function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

app.delete('/value/:_id', json, function (req, res) {
  // console.log(req.params)
  Cat.remove(req.params, function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

app.get('/readvalue', function (req, res) {
  Cat.find(function (err, data) {
    if (err) return console.error(err)
    res.send(data)
  })
})

app.get('/readvalueIndex/:_id', json, function (req, res) {
  // console.log(req.params)
  Cat.find(req.params, function (err, data) {
    if (err) return console.error(err)
    // console.log(data)
    res.send(data)
  })
})

app.put('/value', json, function (req, res) {
  var index = {_id: req.body._id}
  var newdata = {pname: req.body.pname,pprice: req.body.pprice}
  Cat.update(index, {$set: newdata}, function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
