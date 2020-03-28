const { getReviewer, getReviewers, getReviews, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewers routes', () => {
  it('creates a reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'THE company'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'THE company',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('finds a reviewer by id', async() => {
    const reviewer = await getReviewer();
    const reviews = await getReviews({ 'reviewer': reviewer._id });
    const films = await getFilms();
    
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: reviewer.name,
          company: reviewer.company,
          __v: 0,
          reviews: reviews.map(review => ({
            _id: review._id,
            rating: review.rating,
            review: review.review, 
            reviewer: expect.any(String),
            film: {
              _id: review.film,
              title: films.find(film => film._id === review.film).title
            },
          })),
        });
      });
  });

  it('updates a reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Bill Nye' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer, 
          name: 'Bill Nye'
        });
      });
  });

  it('deletes a reviewer if there are no reviews', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'THE company'
      })
      .then(reviewer => {
        return request(app)
          .delete(`/api/v1/reviewers/${reviewer.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'THE company',
          __v: 0
        });
      });
  });

  // it('throws an error if a reviewer still has reviews', async() => {
  //   const reviewer = await getReviewer();

  //   return request(app)
  //     .delete(`/api/v1/reviewers/${reviewer._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(reviewer);
  //     });
  // });

});
