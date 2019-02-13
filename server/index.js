const express = require('express')
const morgan = require('morgan')

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
  next()
})

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('wellcome to my home page!')
})

app.get('/api/categorities', (req, res) => {
  const categorities = [
    'Toys & Games',
    'Games',
    'Clothing & Accessories',
    'Cell Phones',
    'Personal Computers',
    'Beauty',
    'Books',
    'Camera & Photo',
    'Collectible Coins',
    'Electronics (Accessories)',
    'Fashion Jewelry',
    'Fine Art',
    'Handmade',
    'Home & Garden',
    'Musical Instruments',
    'Office Products',
    'Watches'
  ]

  res.status(200).json(categorities) 
})


app.use(errorHandler)

app.get('*', (req, res) => {
  res.send('Home not found')
})


app.listen(3001, 'localhost', () => {console.log(`server run on port: ${3001}`)})


function errorHandler(error, req, res, next) {
  res.send('Error ' + error)
  next()
}