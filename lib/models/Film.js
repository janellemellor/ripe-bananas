const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  }, 
  released: {
    type: Number,
    required: true
  },
  cast: [castSchema]
});

// schema.virtual('reviews', {
//   ref: 'Reviw',
//   localField: '_id',
//   foreignField: 'film'
// });


module.exports = mongoose.model('Film', schema);
