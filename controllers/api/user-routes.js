const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      // TODO: SET USERNAME TO USERNAME SENT IN REQUEST
      username: req.body.username,
      // TOD: SET PASSWORD TO PASSWORD SENT IN REQUEST
      password: req.body.password,
    });

    req.session.save(() => {
      // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE
      req.session.user_id = newUser.id;
      // TODO: SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
      req.session.username = newUser.username;
      // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION
      req.session.logged_in = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE
      req.session.user_id = user.id;
      // TODO: SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
      req.session.username = user.username;
      // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION
      req.session.logged_in = true;
      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "date"],
      },
      {
        model: Comment,
        attributes: ["id", "text"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No user found with that id!" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that id!'});
        return;
    }
    res.json(userData);
  })
    .catch (err => {
    res.status(500).json(err);
  })
});

module.exports = router;
