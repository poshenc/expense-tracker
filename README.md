# 家庭筆記本 Expense-Tracker
---
- Deployment: https://cryptic-hollows-32790.herokuapp.com/
- email: user@example.com
- password: 12345678

## 功能:
- 使用者可以在首頁一次瀏覽所有支出的清單
- 使用者可以在首頁看到所有支出清單的總金額
- 使用者可以新增一筆支出
- 使用者可以編輯支出的所有屬性 (一次只能編輯一筆)
- 使用者可以刪除任何一筆支出 (一次只能刪除一筆)
- 使用者可以註冊帳號
- 使用者可以透過 FB 或註冊帳號登入
- 使用者可以同時根據「類別」與「月份」與「年份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 環境建置:
---
- Visual Studio Code
- Express 4.17.1
- Node.js
- BootStrap v4
- JQuery v3.3.1
- popper.js
- restaurant.json
- express-handlebars 5.3.2
- passport 0.4.1
- connect-flash 0.1.1

## 安裝流程:
---
1. 開啟終端機，並cd 要放專案的位置並執行: `git clone https://github.com/poshenc/expense-tracker.git`
2. 進入專案資料夾 `cd expense-tracker`
3. 安裝 npm 套件 `npm install`
4. 裝 nodemon 套件 (若未安裝) `npm install -g nodemon`
5. 啟動終端機，產生種子資料 npm run seed，執行 app.js 檔案 `npm run dev`
6. 當終端機出現以下字樣，表示啟動完成 The Express server is running on http://localhost:3000