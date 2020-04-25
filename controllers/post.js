const router = require("express").Router();
const { isSignedIn } = require("../middleware/auth");

const User = require("../models/user");
const Post = require("../models/post");

router.param("userId", async (req, res, next, id) => {
  const user = await User.findOne({ _id: id });
  req.profile = user;
  next();
});

router.get("/posts", async (req, res) => {
  const data = await Post.find({});
  res.json({
    data,
  });
});

router.post("/user/:userId/post", isSignedIn, async (req, res) => {
  const post = new Post(req.body);
  post.author = req.params.userId;
  console.log(post.author);
  const postDoc = await post.save();
  const user = await User.findOne({ email: req.profile.email });
  user.posts.push(postDoc._id);
  await user.save();
  res.end();
});

router.delete("/user/:userId/post/:postId", isSignedIn, async (req, res) => {
  const postId = req.params.postId;

  Post.findByIdAndDelete({ _id: postId }, (err) => {
    if (err) {
      return res.json({
        message: "Not Able to delete the Post",
      });
    }
    return res.json({
      message: "Deleted Succesfully",
    });
  });
});

router.patch("/user/:userId/post/:postId", isSignedIn, async (req, res) => {
  const postId = req.params.postId;
  Post.findByIdAndUpdate(
    { _id: postId },
    { $set: { title: req.body.title, post: req.body.post } },
    (err) => {
      if (err) {
        return res.json({ message: "Something is Wrong When Updating" });
      }
      return res.json({ message: "Succesfully Updated" });
    }
  );
});

router.get("/user/:userId/posts", isSignedIn, async (req, res) => {
  const posts = await User.find({ email: req.profile.email }).populate("posts");

  console.log(req);

  res.json({
    data: posts[0].posts,
  });
});

module.exports = router;
