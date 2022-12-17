const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref:'User', require: true },
  title: { type: String, require: true },
  content: { type: String, require: true },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
},{
  timestamps: true,
});

PostSchema.methods.countLikes = function() {
  return this.likes.length;
};

module.exports = mongoose.model('Post', PostSchema);