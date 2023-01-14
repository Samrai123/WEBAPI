const mongoose = require('mongoose')

const category = require('./Category')
const reviewSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const visualSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    img: {
        type:String,
        
    },
    reviews:[reviewSchema],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true})

module.exports = mongoose.model('Visual', visualSchema)