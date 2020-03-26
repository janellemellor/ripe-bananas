const Studio = require('../lib/models/Stuido');

const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 25 } = {}) => {

  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.sentence({ words: 1 }),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.county()
    }
  })));

};
