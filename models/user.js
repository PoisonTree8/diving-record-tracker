const mongoose = require('mongoose');

const diveSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['scuba diving','free diving'],
  },
depth: {
   type: String,
   required: true,
  },
bottomTime: {
  type: String,
   required: true,
  },
notes: {
  type: String,
  required: false,
  },
rating: {
type: Number, min: 1, max: 5,
required: true,
}
  
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dives: [diveSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
