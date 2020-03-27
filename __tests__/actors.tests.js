const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actors routes', () => {
  it('creates an actor', async() => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Panda Bear',
        dob: new Date, 
        pob: 'Canada'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Panda Bear',
          dob: expect.any(Date), 
          pob: 'Canada',
          __v: 0
        });
      });
  });

  
});
