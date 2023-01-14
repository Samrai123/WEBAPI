const express = require('express')
// const books = require('../data/books')
const VisualController = require("../controllers/visual-controller")
const reviewsController = require("../controllers/review-controller")
const { verifyUser } = require('../middleware/auth')
const { verifyAdmin } = require('../middleware/auth')
const router = express.Router()

router.route('/')
    .get(VisualController.getAllVisual)
    .post(verifyUser,VisualController.createAVisual)
    // .put((req, res) => {
    //     res.status(501).send("Not implemented")
    // })
    .delete(VisualController.deleteAllVisual)

router.use(verifyUser)
    .route('/:id')
    .get(VisualController.getVisualById)
    .post((req, res) => {
        res.status(501).json({ 'msg':'Not Implemented'})
    })
    .put(VisualController.updateVisualById)
    .delete(VisualController.deleteVisualById)
        
router.route('/:id/reviews')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReview)
    .put((req, res) => res.status(501).json({'msg': 'not Implemented'}))
    .delete(reviewsController.deleteAllReviews)

    router.route('/:id/reviews/:review_id')
    .get(reviewsController.getReviewsByID)
    .post((req, res) => res.status(501).json({'msg': 'not Implemented'}))
    .put(reviewsController.updateReviewsById)
    .delete(reviewsController.deleteReviewByID)

module.exports = router