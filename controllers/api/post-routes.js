const router = require("express").Router();
const { Post, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
      title: req.body.title,
      body: req.body,
      // TODO: SET USERID TO LOGGEDIN USERID
      userId: req.session.userId,
    });

    req.session.save(() => {
      req.session.title = req.body.title;
      req.session.body = req.body;
      req.session.loggedIn = true;
    res.json(newPost);
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", (req, res) => {
//   Post.findAll({
//     attributes: ["id"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "body", "postId", "userId"],
//         include: {
//           model: User,
//           attributes: ["username"]
//         }
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((newPost) => {
//       if (!newPost) {
//         res.status(404).json({ message: "No post found with that id!" });
//         return;
//       }
//       res.json(newPost);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// router.get("/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id" ],
//     include: [{
//       model: Comment,
//       attributes: ["id", "body", "postId", "userId"],
//       include: {
//         model: User,
//         attributes: ["username"],
//       },
//     },
//     {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((newPost) => {
//       if (!newPost) {
//         res.status(404).json({ message: "No post found with that id!" });
//         return;
//       }

//       const postData = newPost({ plain: true });

//       res.render('single-post', {
//         postData,
//         loggedIn: req.session.loggedIn

//         // res.json(newPost);
//       })
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// router.post('/', async (req, res) => {
//   try {
//     const newPost = await Post.create({
//       title: req.body.title,
//       content: req.body.content
//     });
//     res.json(newPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     const [affectedRows] = await Post.update(req.body, {
//       // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }

//     req.session.save(() => {
//       req.session.title = req.body.title;
//       req.session.content = req.body;
//       req.session.updatePost = true;
//       res.json(affectedRows);
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (affectedRows > 0) {
      res.status(200).end()
    }else {
      res.status(404).end();
    } 
  }
  catch (err){
    res.status(500).json(err)
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
