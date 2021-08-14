const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'User',
  email: 'user@example.com',
  password: '12345678'
}
const records = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021/07/20',
    amount: 250,
    merchant: '麥當勞'
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021/07/22',
    amount: 120,
    merchant: '台北車站'
  },
  {
    name: '看電影',
    category: '休閒娛樂',
    date: '2021/07/24',
    amount: 350,
    merchant: '信義華納威秀'
  },
  {
    name: '買電視',
    category: '家居物業',
    date: '2021/07/25',
    amount: 35000,
    merchant: '燦坤'
  },
  {
    name: '捐款',
    category: '其他',
    date: '2021/08/26',
    amount: 50000,
    merchant: '關愛基金會'
  },
]

db.once('open', () => {
  User.findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('Seed account already exist!')
        process.exit()
      }
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          records.forEach(item => item['userId'] = userId)
          Record.create(records)
            .then(() => {
              console.log('Record Seeder Done~')
              process.exit()
            })
        })
    })
})
