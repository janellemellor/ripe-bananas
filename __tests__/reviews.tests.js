const { getReview, getReviewer, getReviews, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {
  it('creates a review', async() => {
    const film = await getFilm();
    const reviewer = await getReviewer();

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: reviewer._id,
        review: 'This movie was the best!',
        film: film._id 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3,
          reviewer: reviewer._id,
          review: 'This movie was the best!',
          film: film._id, 
          __v: 0
        });
      });
  });

  it('deletes a review', async() => {
    const review = await getReview();

    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });

});
