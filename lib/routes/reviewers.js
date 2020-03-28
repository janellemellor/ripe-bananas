const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Reviewer
        .findById(req.params.id)
        .select({ name: true, company: true }),

      Review
        .find({ reviewer: req.params.id })
        .select({ rating: true, review: true, film: true })  
    ])
      .then(([reviewer, reviews]) => { res.send({ ...reviewer.toJSON(), reviews });
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    if(Review
      .find({ reviewer: req.params.id })
    ) {
      res.send('Cannot delete Reviewer if there are reviews');
    } else {

      Reviewer
        .findByIdAndDelete(req.params.id)
        .then(reviewer => res.send(reviewer))
        .catch(next);
    }});
