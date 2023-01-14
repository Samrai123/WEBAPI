const Visual = require('../models/Visual')

const getAllReviews = (req, res, next) => {
    Visual.findById(req.params.id)
    .then((visual) => {
        res.json(visual.reviews)
    }).catch(next)
    
}

const createReview = (req, res, next) => {
    Visual.findById(req.params.id)
    .then((visual => {
        visual.reviews.push(req.body)
        visual.save().then(b => res.json(b.reviews))
    })).catch(next)

}

const deleteAllReviews = (req, res, next) => {
        Visual.findById(re.params.id)
        .then( visual => {
            visual.reviews = []
            visual.save().then(b => res.json(b.reviews))
        }).catch(next)
}
const getReviewsByID = (req ,res, next)=>{
    Visual.findById(req.params.id)
    .then(visual =>{
        res.json(visual.reviews.id(req.params.review_id))

    }).catch(next)
}
const updateReviewsById = (req,res,next)=>{
    Visual.findById(req.params.id)
    .then(visual => {
        // let review = book.revies.id(req.params.review_id)
        // review.body = req.body.body
        // book.save()
        let updated_reviews = visual.reviews.map((item)=> {
            if(item.id == req.params.review_id){
                item.body = req.body.body
            }
            return item
        })
        visual.reviews = updated_reviews
        visual.save().then(visual => res.json(visual.reviews))
    }).catch(next)
}
const deleteReviewByID = (req,res,next)=>{
    Visual.findById(req.params.id)
    .then(visual => {
        let updated_reviews = visual.reviews.filter((item)=> {
            return item.id != req.params.review_id
        })
        visual.reviews = updated_reviews
        visual.save().then(visual => res.json(visual.reviews))
    }).catch(next)
}
module.exports = {
    getAllReviews,
    createReview,
    deleteAllReviews,
    getReviewsByID,
    updateReviewsById,
    deleteReviewByID
}