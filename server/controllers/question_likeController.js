const pool = require('../config/db');

// GET all question likes/dislikes
exports.getQuestionLikes = async (req, res) => {
  try {
    const questionLikes = await pool.query(
      'SELECT * FROM question_likes'
    );
    res.json(questionLikes.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET all likes for a specific question
exports.getQuestionLikesById = async (req, res) => {
    try {
      const { question_id } = req.params;
      const questionLikes = await pool.query(
        'SELECT * FROM question_likes WHERE question_id = $1',
        [question_id]
      );
      res.json(questionLikes.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  

// POST a new question like/dislike
exports.createQuestionLike = async (req, res) => {
  try {
    const { question_id, user_id, liked } = req.body;
    const newQuestionLike = await pool.query(
      'INSERT INTO question_likes (question_id, user_id, liked) VALUES ($1, $2, $3) RETURNING *',
      [question_id, user_id, liked]
    );
    res.json(newQuestionLike.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// UPDATE a question like/dislike
exports.updateQuestionLike = async (req, res) => {
  try {
    const { question_id, user_id, liked } = req.body;
    const { id } = req.params;
    const updatedQuestionLike = await pool.query(
      'UPDATE question_likes SET question_id = $1, user_id = $2, liked = $3 WHERE id = $4 RETURNING *',
      [question_id, user_id, liked, id]
    );
    res.json(updatedQuestionLike.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE a question like/dislike
exports.deleteQuestionLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestionLike = await pool.query(
      'DELETE FROM question_likes WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(deletedQuestionLike.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// POST a new like
exports.createLike = async (req, res) => {
try {
const { question_id } = req.params;
const { user_id, liked } = req.body;
const existingLike = await pool.query(
'SELECT * FROM question_likes WHERE question_id = $1 AND user_id = $2',
[question_id, user_id]
);
if (existingLike.rows.length > 0) {
const updatedLike = await pool.query(
'UPDATE question_likes SET liked = $1 WHERE question_id = $2 AND user_id = $3 RETURNING *',
[liked, question_id, user_id]
);
res.json(updatedLike.rows[0]);
} else {
const newLike = await pool.query(
'INSERT INTO question_likes (question_id, user_id, liked) VALUES ($1, $2, $3) RETURNING *',
[question_id, user_id, liked]
);
res.json(newLike.rows[0]);
}
} catch (err) {
console.log(err);
res.status(500).json({ error: 'Something went wrong' });
}
};

// GET number of likes for each question
exports.getLikesForQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
      const likesForQuestion = await pool.query(
        `SELECT questions.id, title, COUNT(*) AS likes
         FROM questions
         LEFT JOIN question_likes ON questions.id = question_likes.question_id
         WHERE liked = TRUE AND questions.id = $1
         GROUP BY questions.id, title`,
        [id]
      );
      res.json(likesForQuestion.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
