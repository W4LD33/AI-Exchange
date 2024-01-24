const pool = require('../config/db');

// GET all Questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await pool.query(
      'SELECT * FROM questions'
    );
    res.json(questions.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET Question By Id
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await pool.query(
      'SELECT * FROM questions WHERE id = $1',
      [id]
    );
    if (question.rows.length === 0) {
      res.status(404).json({ error: 'Question not found' });
    } else {
      res.json(question.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// POST a new question
exports.createQuestion = async (req, res) => {
  try {
    const { title, body, user_id } = req.body;
    const newQuestion = await pool.query(
      'INSERT INTO questions (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, body, user_id]
    );
    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE a question
exports.updateQuestion = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;
    const updatedQuestion = await pool.query(
      'UPDATE questions SET title = $1, body = $2 WHERE id = $3 RETURNING *',
      [title, body, id]
    );
    res.json(updatedQuestion.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE a question
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await pool.query(
      'DELETE FROM questions WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(deletedQuestion.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
;