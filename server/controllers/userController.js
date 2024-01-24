const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get users by IDs
exports.getUsersByIds = async (req, res) => {
  try {
    const { ids } = req.query;
    const users = await pool.query('SELECT * FROM users WHERE id = ANY($1::int[])', [ids.split(',')]);
    res.json(users.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
