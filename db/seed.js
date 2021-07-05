const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 15, actorsToCreate = 25, reviewersToCreate = 10, filmsToCreate = 50, reviewsToCreate = 100 } = {}) => {

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.county()
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(), 
    pob: chance.country()
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company() 
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [...Array(5)].map(() => ({ role: chance.name(), actor: chance.pickone(actors)._id }))
  })));

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers)._id,
    review: chance.sentence(),
    film: chance.pickone(films)._id
  })));

};

