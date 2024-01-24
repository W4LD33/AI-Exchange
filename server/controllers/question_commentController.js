const pool = require('../config/db');

// GET all question comments
exports.getQuestionComments = async (req, res) => {
    try {
      const questionComments = await pool.query(
        'SELECT * FROM question_comments'
      );
      res.json(questionComments.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  // GET a question comment by ID
  exports.getQuestionCommentsById = async (req, res) => {
    try {
      const { id } = req.params;
      const questionComment = await pool.query(
        'SELECT * FROM question_comments WHERE id = $1',
        [id]
      );
      if (questionComment.rows.length === 0) {
        res.status(404).json({ error: 'Question comment not found' });
      } else {
        res.json(questionComment.rows[0]);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  
// POST a new question comment
exports.createQuestionComment = async (req, res) => {
    try {
    const { question_id, user_id, comment } = req.body;
    const newQuestionComment = await pool.query(
        'INSERT INTO question_comments (question_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *',
        [question_id, user_id, comment]
    );
    res.json(newQuestionComment.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
    };
    
    // UPDATE a question comment
    exports.updateQuestionComment = async (req, res) => {
    try {
    const { question_id, user_id, comment } = req.body;
    const { id } = req.params;
    const updatedQuestionComment = await pool.query(
        'UPDATE question_comments SET question_id = $1, user_id = $2, comment = $3 WHERE id = $4 RETURNING *',
        [question_id, user_id, comment, id]
    );
    res.json(updatedQuestionComment.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
    };
    
    // DELETE a question comment
    exports.deleteQuestionComment = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedQuestionComment = await pool.query(
        'DELETE FROM question_comments WHERE id = $1 RETURNING *',
        [id]
    );
    res.json(deletedQuestionComment.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
    };
    

    exports.getQuestionCommentsByQuestionId = async (req, res) => {
        try {
          const { questionId } = req.params;
          const questionComments = await pool.query(
            'SELECT * FROM question_comments WHERE question_id = $1',
            [questionId]
          );
          res.json(questionComments.rows);
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Something went wrong' });
        }
      };