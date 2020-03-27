const { getFilm, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('films routes', () => { 
  it('creates a film', async() => {
    return request(app)
      .post('api/v1/films')
      .send({
        title: 'Always Be My Maybe',
        studio: 'A24',
        released: 2019,
        cast: [{ 
          role: 'Jessica', 
          actor: 'Ali Wong' }] 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Always Be My Maybe',
          studio: 'A24',
          released: 2019,
          cast: [{ 
            role: 'Jessica', 
            actor: 'Ali Wong' }],
          __v: 0 
        });
      });
        
  });
});
    
