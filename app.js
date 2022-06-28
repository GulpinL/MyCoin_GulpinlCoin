const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! Long here nhoi nhoi here')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})