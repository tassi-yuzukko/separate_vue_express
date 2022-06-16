const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3333;

app.post('/test', function (req, res) {
  console.log("/test に来た");
  return res.send({
    message: req.body.text
  });
})

app.listen(process.env.PORT || port, () => console.log('Example app listening http://localhost:' + port + "/test"))