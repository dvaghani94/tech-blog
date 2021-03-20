const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: /api/comment/
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // TODO: COMMENT BODY IN REQUEST USING SPREAD
      ...req.body,
      // TODO: SET USERID TO SESSION LOGGEDIN USERID
      user_id: req.session.user_id
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });

    const comments = commentData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { comments });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
