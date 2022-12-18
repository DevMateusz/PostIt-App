const Post = require('../model/Post');
const User = require('../model/User');

const createPost = async(req, res) => {
  const {title, content} = req.body;
  const creator = req.user.id;
  if (title && content && creator) {
    try {
      const newPost = await Post.create({
        creator,
        title,
        content,
      });
      const post = await newPost.populate({ path: 'creator', select: 'name colorPattern' });
      if(post){
        res.status(201).json({...JSON.parse(JSON.stringify(post)), likes: post.countLikes()});
      } else {
        return res.status(500).json({message: "Post cannot be saved"});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create post' });
    }
  } else return res.status(400).json({message: "Title and content are required"});
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const creator = req.user.id;
  const { title, content } = req.body;
  if (title && content) {
    try {
      const post = await Post.findOne({ _id: id, creator: creator }).populate({ path: 'creator', select: 'name ColorPattern' });
      if (!post) {
        return res.status(403).json({ message: 'Access denied' });
      }
      post.title = title;
      post.content = content;
      await post.save();
      res.status(201).json({...JSON.parse(JSON.stringify(post)), likes: post.countLikes()});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update post' });
    }
  } else {
    return res.status(400).json({ message: 'Title and content are required' });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const creator = req.user.id;
  if (id) {
    try {
      const post = await Post.findOneAndDelete({ _id: id, creator: creator });
      if (!post) {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.status(200).json({ id: post._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete post' });
    }
  } else {
    return res.status(400).json({ message: 'Post ID is required' });
  }
};

const likePost = async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  if (id) {
    try {
      const post = await Post.findOne({ _id: id });
      const userData = await User.findOne({ _id: user });
      if (!post) {
        return res.status(404).json({ message: "Post with the given ID was not found" });
      }
      if (post.likes.includes(user)) {
        return res.status(400).json({ message: "This user has already liked this post" });
      }
      post.likes.push(user);
      userData.liked.push(id);
      await post.save();
      await userData.save();
      res.status(200).json({ id: post._id, likes: post.countLikes(), isLiked: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to like post" });
    }
  } else {
    return res.status(400).json({ message: "Post ID is required" });
  }
};

const dislikePost = async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  if (id) {
    try {
      const post = await Post.findOne({ _id: id });
      const userData = await User.findOne({ _id: user });
      if (!post) {
        return res.status(404).json({ message: "Post with the given ID was not found" });
      }
      if (!post.likes.includes(user)) {
        return res.status(400).json({ message: "This user has not liked this post yet" });
      }
      post.likes = post.likes.filter(like => !like.equals(user));
      userData.liked = userData.liked.filter(like => !like.equals(id));
      await post.save();
      await userData.save();
      res.status(200).json({ id: post._id, likes: post.countLikes(), isLiked: false });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to dislike post" });
    }
  } else {
    return res.status(400).json({ message: "Post ID is required" });
  }
};



module.exports = { createPost, updatePost, deletePost, likePost, dislikePost };

