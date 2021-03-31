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
      userId: req.session.userId
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const commentData = await Comment.findAll({
//       include: [User],
//     });

//     const comments = commentData.map((post) => post.get({ plain: true }));

//     res.render('all-posts', { comments });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put('/:id', (req, res) => {
//   Comment.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(commentData => {
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }

//     res.json(commentData);
//   })
//    .catch (err => {
//     res.status(500).json(err);
//   });
  
// });

// router.delete('/:id', (req, res) => {
//   Comment.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(commentData => {
//         if (!commentData) {
//           res.status(404).json({ message: 'No comment found with this id!' });
//           return;
//         }
    
//         res.json(commentData);
//       })
//        .catch (err => {
//         res.status(500).json(err);
//       });

// });

// module.exports = router;
