const mongoose = require('mongoose')
const Record = require('../record') // 載入 todo model
const records = [
  {
    name: '午餐',
    category: '餐食飲品',
    date: 2021 / 7 / 20,
    amount: 250
  },
  {
    name: '捷運',
    category: '交通出行',
    date: 2021 / 7 / 22,
    amount: 120
  },
  {
    name: '看電影',
    category: '休閒娛樂',
    date: 2021 / 7 / 23,
    amount: 350
  },
  {
    name: '買電視',
    category: '家居物業',
    date: 2021 / 7 / 24,
    amount: 35000
  },
  {
    name: '捐款',
    category: '其他',
    date: 2021 / 7 / 25,
    amount: 5000
  },
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Record.create(records)
    .then(() => {
      console.log('recordSeeder done!')
      db.close()
      console.log('database connection closed!')
    })
})