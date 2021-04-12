const express = require('express');
const router = express.Router();
const Class = require('./model/class')

router.get('/', (req, res) => {
    return Class.find().exec((err, classes) => {
        if (err) throw err;
        res.json(classes)
    })
})


router.post('/', (req, res) => {
    let lop = new Class(req.body)
    lop.save((err) => {
        if (err) throw err;
        console.log('class save successfully');
    })
    res.json({ "data": lop })
})

router.put('/', (req, res) => {
    if (!req.body.id) {
        res.status(400).send({ messError: 'not found id' })
    }
    const id = { _id: req.body.id }
    const update = req.body;
    Class.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
        if (err) return res.send(err)
        res.json(result)
    });
})
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ messError: 'not found id' })
    }
    const id = { _id: req.params.id }
    Class.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ mess: "Sucessesful delete id:" + req.params.id })
        }
    })
})
module.exports = router