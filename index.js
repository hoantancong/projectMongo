const express = require('express')
const app = express()
const PORT = 8797
const cors = require('cors')
const mongoose = require('mongoose');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const StudentRouter = require('./studentController')
const classRouter = require('./classController')
const SchoolRouter = require('./schoolController')
const SubjectRouter = require('./subjectcontroller')
//Thiết lập một kết nối mongoose mặc định
var mongoDB = 'mongodb://localhost:27017/University';
mongoose.connect(mongoDB, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
var db = mongoose.connection;
//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
app.use('/student', StudentRouter)
app.use('/school', SchoolRouter)
app.use('/class',classRouter)
app.use('/subject',SubjectRouter)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT) })
module.exports = app;
