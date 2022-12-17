const Post = require('../model/Post');
const User = require('../model/User');
const { ObjectId } = require('mongoose').Types;

function getQueries(search, user={}) {
  return {
    latest: [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { createdAt: -1 } }
    ],
    oldest: [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { createdAt: 1 } }
    ],
    mostLikes: [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { likes: -1 } }
    ],
    youLike: [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      { 
        $match: { likes: { $eq: ObjectId(user._id) } }
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { createdAt: -1 } }
    ],
    your: [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      { 
        $match: { "creator._id": { $eq: ObjectId(user._id) } }
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { createdAt: -1 } }
    ],
    yourFriends : [
      { $match: { title: { $regex: new RegExp(search, "i") } } },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      {
        $match: { "creator._id": { $in: user.friends } }
      },
      { $project: {
        likes: { $size: "$likes" },
        _id: 1,
        creator: { _id: "$creator._id", name: "$creator.name", colorPattern: "$creator.colorPattern" },
        title: 1,
        content: 1,
        createdAt: 1
      } },
      { $sort: { createdAt: -1 } }
    ]
    
  }
}



const getPostsGuest = async (req, res) => {
  const { sort, search } = req.params;
  const queries = getQueries(search);
  switch (sort) {
    case "latest":
      Post.aggregate(queries.latest)
      .exec(function(error, posts) {
        sendPostToGuest(posts, res)
      });
      break;
    case "oldest":
      Post.aggregate(queries.oldest)
      .exec(function(error, posts) {
        sendPostToGuest(posts, res)
      });
      break;
    case "most likes":
      Post.aggregate(queries.mostLikes)
      .exec(function(error, posts) {
        sendPostToGuest(posts, res)
      });
      break;
    default:
      res.status(200).json({message: "Incorrect sorting method"})
      break;
  }
}

function sendPostToGuest(posts, res) {
  const parsePosts = JSON.parse(JSON.stringify(posts))
  parsePosts.forEach(post => {
    post.isFriend = false
    post.isLiked = false
    post.isOwner = false
  });
  res.status(200).json(parsePosts)
}

const getPostsLogged = async (req, res) => {
  const { sort, search } = req.params;
  const user = await User.findOne({ _id: req.user.id });
  const queries = getQueries(search, user);
  switch (sort) {
    case "latest":
      Post.aggregate(queries.latest)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    case "oldest":
      Post.aggregate(queries.oldest)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    case "most likes":
      Post.aggregate(queries.mostLikes)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    case "you like":
      Post.aggregate(queries.youLike)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    case "your":
      Post.aggregate(queries.your)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    case "your friends":
      Post.aggregate(queries.yourFriends)
      .exec(function(error, posts) {
        sendPostToLogged(posts, req, res);
      });
      break;
    default:
      res.status(200).json({message: "Incorrect sorting method"})
      break;
  }
}

async function sendPostToLogged(posts, req, res) {
  const user = await User.findOne({ _id: req.user.id });
  const parseUser = JSON.parse(JSON.stringify(user));
  

  posts.forEach(post => {
    post.isOwner = false
    post.isLiked = false
    post.isFriend = false
    
    if(post.creator._id == parseUser._id){
      post.isOwner = true
    }
    parseUser.liked.forEach(like => {
      if (post._id == like) {
        post.isLiked = true
      }
    })
    parseUser.friends.forEach(friend => {
      if (post.creator._id == friend) {
        post.isFriend = true
      }
    })
  });
  res.status(200).json(posts)
}

module.exports = { getPostsLogged, getPostsGuest };
