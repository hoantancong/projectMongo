var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: String,
    address: String,
    school: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'School'
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

var Student = mongoose.model('Student', studentSchema);
  
 module.exports = Student;