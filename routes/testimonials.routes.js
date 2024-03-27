const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');


// get all testimonials
router.get('/testimonials', TestimonialController.getAll);

// get random testimonial
router.get('/testimonials/random', TestimonialController.getRandom);

// get testimonial by id
router.get('/testimonials/:id', TestimonialController.getById);

// add testimonial
router.post('/testimonials', TestimonialController.postNew);

// make changes in testimonials data
router.put('/testimonials/:id', TestimonialController.putById);

// delete testimonial
router.delete('/testimonials/:id', TestimonialController.deleteById);

module.exports = router;