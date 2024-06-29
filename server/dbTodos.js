const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      
    },
    description:{
        type: String,
        required: false,
    },
    
}, {timestamps: true})

module.exports = mongoose.model('todos', todoSchema);
