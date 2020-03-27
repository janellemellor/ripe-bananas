const { getFilm, getFilms, getStudio, getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('films routes', () => { 
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();

    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Always Be My Maybe',
        studio: studio._id,
        released: 2019,
        cast: [{ 
          role: 'Jessica', 
          actor: actor._id }] 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Always Be My Maybe',
          studio: studio._id,
          released: 2019,
          cast: [{ 
            _id: expect.any(String),
            role: 'Jessica', 
            actor: actor._id }],
          __v: 0 
        });
      });
        
  });
});
    
