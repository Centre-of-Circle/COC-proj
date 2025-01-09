const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://coc:tt7Z8VIQrdBQ7FXX@cluster0.x1hzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas and Models
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
});
const User = mongoose.model('User', UserSchema);

const QuestionSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stem: { type: String, required: true },
  options: { A: String, B: String, C: String, D: String },
  correctAnswer: { type: String, required: true },
  tag: { type: String, required: true },
});
const Question = mongoose.model('Question', QuestionSchema);

const PaperSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  title: { type: String, required: true },
});
const Paper = mongoose.model('Paper', PaperSchema);

// Middleware for JWT Authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Routes

// User Authentication
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashedPassword, role });
  try {
    await user.save();
    if(role=="student"){
      res.send('/student/dashboard');

    }else{
      res.send('User registered!');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');
  const token = jwt.sign({ _id: user._id, role: user.role }, 'secretkey');
  res.header('Authorization', token).send({ token });
});

// Question Management
app.post('/api/questions', authenticate, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).send('Access Denied');
  const question = new Question({ ...req.body, teacherId: req.user._id });
  try {
    await question.save();
    res.send('Question added!');
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/questions', authenticate, async (req, res) => {
  const { tag } = req.query;
  const filter = tag ? { tag } : {};
  const questions = await Question.find(filter);
  res.send(questions);
});

// Paper Management
app.post('/api/papers', authenticate, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).send('Access Denied');
  const paper = new Paper({ ...req.body, teacherId: req.user._id });
  try {
    await paper.save();
    res.send('Paper created!');
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/papers', authenticate, async (req, res) => {
  const papers = await Paper.find({ teacherId: req.user._id }).populate('questions');
  res.send(papers);
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
