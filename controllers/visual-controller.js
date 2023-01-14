const Visual = require ('../models/Visual')

const getAllVisual = (req, res,next) => {
    Visual.find()
    .then(visual => res.json(visual))
    .catch(next)
}

const createAVisual = (req, res, next) => {
    Visual.create(req.body)
    .then(visual => res.status(201).json(visual))
    .catch(err => next(err))
}

const deleteAllVisual = (req, res, next) => {
    Visual.deleteMany()
    .then(reply => res.json(reply))
    .catch(next)
}

const getVisualById = (req, res, next) => {
    Visual.findById(req.params.id)
    .populate('category')
    .then(visual => res.json(visual))
    .catch(next)
    
}
const updateVisualById = (req, res, next) => {
    Visual.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then(visual => res.json(visual))
    .catch(next)
}
const deleteVisualById = (req, res, next) => {
    Visual.findByIdAndDelete(req.params.id)
    .then(visual => res.json(visual))
    .catch(next)
}

module.exports = {
     getAllVisual,
     createAVisual,
     deleteAllVisual,
    getVisualById,
     updateVisualById,
     deleteVisualById
}