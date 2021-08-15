if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const db = require('../../config/mongoose')

const Category = require('../category')
const categories = [
  {
    name: '家居物業',
    icon: 'fas fa-home fa-3x'
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van fa-3x'
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam fa-3x'
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils fa-3x'
  },
  {
    name: '其他',
    icon: 'fas fa-pen fa-3x'
  }
]

db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('categorySeeder done!')
      db.close()
      console.log('database connection closed!')
    })
})




