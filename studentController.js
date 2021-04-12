const express = require('express');
const router = express.Router();
const Student = require('./model/student')

router.get('/', (req, res) => {
    return Student.find().populate(['class', 'school']).exec((err, students) => {
        if (err) throw err;
        res.json(students)
    })
})

router.get('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ messError: 'not found id' })
    }
    const id = { _id: req.params.id }
    return Student.findById(id).populate(['class', 'school']).exec((err, student) => {
        if (err) throw err;
        res.json(student)
    })
})

router.post('/', (req, res) => {
    let student = new Student(req.body)
    student.save((err) => {
        if (err) throw err;
        console.log('Student save successfully');
    })
    res.json({ "data": student })
})

router.put('/', (req, res) => {
    if (!req.body.id) {
      return  res.status(400).send({ error: "not found id" });
    }
    const id = { _id: req.body.id }
    const update = req.body;
    Student.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
        if (err) return res.send(err)
        // console.log(result)
        res.json(result)
    });
})
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ messError: 'not found id' })
    }
    const id = { _id: req.params.id }
    Student.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            return res.json({ mess: "Sucessesful delete id:" + req.params.id })
        }
    })
})
module.exports = router