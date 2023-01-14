const mongoose = require('mongoose')



const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required: [true,'name is required']
    },
    visual: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Visual'
        
    }]
})

module.exports = mongoose.model('Category', categorySchema)