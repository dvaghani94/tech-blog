const router = require("express").Router();
const { Post, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
      ...req.body,
      // TODO: SET USERID TO LOGGEDIN USERID
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "title", "body", "postId", "userId"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((productData) => {
      if (!productData) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
      res.json(productData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content" ],
    include: [{
      model: Comment,
      attributes: ["id", "title", "body", "postId", "userId"],
      include: {
        model: User,
        attributes: ["username"],
      },
    },
    {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  try {
    const newPost = await Post.create({
      user_id: req.session.user_id,
      title: req.body.title,
      content: req.body.content
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

    req.session.save(() => {
      req.session.title = req.body.title;
      req.session.content = req.body.content;
      req.session.updatePost = true;
      res.json(affectedRows);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
