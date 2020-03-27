const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 25, actorsToCreate = 25 } = {}) => {

  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.county()
    }
  })));

  await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(), 
    pob: chance.country()
  })));

};
