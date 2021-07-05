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
 
  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id,
            title: film.title, 
            released: film.released, 
            studio: { 
              _id: film.studio,
              name: expect.any(String)
            }
          });
        });   
      });
  });

  //   it('finds a film by id', async() => {
  //     const film = await getFilm();
    
  //     return request(app)
  //       .get(`/api/v1/films/${film._id}`)
  //       .then(res => {
  //         films.forEach(film => {
  //             expect(res.body).toContainEqual(
  //                 {
  //                     _id: film._id,
  //                     title: film.title,
  //                     released: film.released,
  //                     studio: { 
  //                         _id: film.studio, 
  //                         name: expect.any(String)
  //                     },
  //                     cast: [{
  //                         _id: film.cast,
  //                         role: film.cast.role,
  //                         actor: { 
  //                             _id: film.actor,
  //                             name: film.actor.name 
  //                         },
  //                     }],
  //                     reviews: [{
  //                         id: ,
  //                         rating: ,
  //                         review: ,
  //                         reviewer: { 
  //                             _id: ,
  //                             name: ,
  //                          }
  //                     }],
  //                     __v: 0
  //                 });
  //             });



  it('finds a film by id', async() => {
    const film = await getFilm();
                        
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {

        expect(res.body).toEqual(film);
      });
  });

});
    
