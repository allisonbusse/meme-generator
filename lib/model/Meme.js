const { Schema, model } = require('mongoose');

const schema = new Schema({
  top: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = model('Meme', schema);
