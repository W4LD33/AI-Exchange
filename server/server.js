const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const question_likeRoutes = require('./routes/question_likesRoutes')
const question_commentRoutes = require('./routes/question_commentRoutes')
const usersRoutes = require('./routes/userRoutes')
const authenticationRoutes = require('./routes/authenticationRoutes')

app.use(bodyParser.json());
app.use(cors());

app.use('/questions', questionRoutes);
app.use('/question_likes', question_likeRoutes)
app.use('/question_comments', question_commentRoutes)
app.use('/users', usersRoutes);
app.use('/authentication', authenticationRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
