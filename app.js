const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('handlebars-helpers')()

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// home page 路由
// app.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .then(records => res.render('index', { records }))
//     .catch(error => console.error(error))
// })

app.get('/', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const records = await Record.find().lean().sort({ date: 'desc', _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList })
})

app.get('/filter', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const { categorySelector } = req.query
  const records = await Record.find({ category: categorySelector }).lean().sort({ _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList, categorySelector })
})

//eg 22
// app.get('/', (req, res) => {
//   const categories = []
//   const records = []
//   totalAmount = 0

//   Category.find()
//     .lean()
//     .then(category => {
//       categories.push(...category)
//       Record.find()
//         .lean()
//         .then(record => {
//           records.push(...record)
//           records.forEach(record => {
//             const category = categories.find(category => category.name === record.category)
//             record.icon = category.icon
//             totalAmount += record.amount
//           })
//           res.render('index', { records, categories, totalAmount })
//         })
//         .catch(error => console.log(error))
//     })
//     .catch(error => console.log(error))
// })

// new 路由
app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.error(error))
})


//edit 路由
app.get('/records/:id/edit', async (req, res) => {
  const categoryList = await Category.find().lean()
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
    .catch(error => console.log(error))

})

//new 資料庫新增資料
app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//edit 資料庫修改特定的資料
app.put('/records/:id', (req, res) => {
  const { name, date, category, amount } = req.body
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//delete 資料庫刪除特定的資料
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})