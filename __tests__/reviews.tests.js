const { getReview, getReviewer } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {
  it('creates a review', async() => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: 'Roger Ebert',
        review: 'This movie was the best!',
        film: 'Best.Movie.Ever' 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3,
          reviewer: 'Roger Ebert',
          review: 'This movie was the best!',
          film: 'Best.Movie.Ever', 
          __v: 0
        });
      });
  });
});
