const User = require('../model/User');

const addToFriends = async(req, res) => {
  const friendId = req.params.id;
  const userId = req.user.id;
  if (friendId) {
    try {
      const user = await User.findOne({ _id: userId });
      if (userId == friendId) {
        return res.status(404).json({ message: "You cannot add yourself to friends" });
      }
      if (!user) {
        return res.status(404).json({ message: "User with the given ID was not found" });
      }
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "This user has already your friend" });
      }
      user.friends.push(friendId);
      await user.save();
      res.status(200).json({ creatorId: friendId, isFriend: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add to friends" });
    }
  } else {
    return res.status(400).json({ message: "Friend ID is required" });
  }
}

const removeFromFriends = async(req, res) => {
  const friendId = req.params.id;
  const userId = req.user.id;
  if (friendId) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User with the given ID was not found" });
      }
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ message: "This user has not your friend" });
      }
      user.friends = user.friends.filter(friend => !friend.equals(friendId))
      await user.save();
      res.status(200).json({ creatorId: friendId, isFriend: false });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to remove from friends" });
    }
  } else {
    return res.status(400).json({ message: "Friend ID is required" });
  }
}

module.exports = { addToFriends, removeFromFriends };

