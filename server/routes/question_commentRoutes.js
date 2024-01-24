const express = require('express');
const router = express.Router();
const question_commentController = require('../controllers/question_commentController');

router.get('/', question_commentController.getQuestionComments);
router.post('/', question_commentController.createQuestionComment);
router.get('/:id', question_commentController.getQuestionCommentsById);
router.put('/:id', question_commentController.updateQuestionComment);
router.delete('/:id', question_commentController.deleteQuestionComment);
router.get('/question/:questionId', question_commentController.getQuestionCommentsByQuestionId);

module.exports = router;
