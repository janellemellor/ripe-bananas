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
          dob: expect.any(String), 
          pob: 'Canada',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id,
            name: actor.name
          });
        });
      });
  });

  it('finds an actor by id', async() => {
    const actor = await getActor();
    
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id,
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob,
          films: expect.any(Array)
        });
      });
  });
  
});
