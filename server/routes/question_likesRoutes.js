const express = require('express');
const router = express.Router();
const question_likeController = require('../controllers/question_likeController');

router.get('/', question_likeController.getQuestionLikes);
router.get('/:id', question_likeController.getQuestionLikesById);
router.post('/', question_likeController.createQuestionLike);
router.put('/:id', question_likeController.updateQuestionLike);
router.delete('/:id', question_likeController.deleteQuestionLike);

router.post('/question/:question_id/like', question_likeController.createLike);

// new route to get likes for each question

router.get('/question/:id', question_likeController.getLikesForQuestionById);


module.exports = router;
