const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('studio routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Monsters Inc',
        address: {
          city: 'Portland',
          state: 'Oregon',
          country: 'Canada'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Monsters Inc',
          address: {
            city: 'Portland',
            state: 'Oregon',
            country: 'Canada'
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id,
            name: studio.name
          });
        });
      });
  });
});

        
 



//routes: 
//POST
//GET ALL
//GET By ID