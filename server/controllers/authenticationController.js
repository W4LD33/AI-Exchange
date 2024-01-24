const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password using Bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert the user into the database
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    const userId = result.rows[0].id;

    // Create a JWT token for the user
    const token = jwt.sign({ userId }, 'your_secret_key');

    res.json({ token });
  } catch (error) {
    console.error(error);
    if (error) {
      res.json({ detail: error.detail });
      return;
    }
    res.status(500).json({ message: 'An error occurred while signing up' });    
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user from the database
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user.id }, 'your_secret_key');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
