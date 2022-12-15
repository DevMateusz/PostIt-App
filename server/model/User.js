const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true  },
  email: { type: String, require: true, lowercase: true },
  password: { type: String, require: true },
  colorPattern: { type: Number, require: true },
  token: { type: String },
  friends: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  liked: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);