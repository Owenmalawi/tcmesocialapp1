const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tcme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: String,
  password: String,
  friends: [String],
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
  const { name, phone, username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const user = new User({ name, phone, username, password, friends: [] });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user });
});

app.post('/add-friend', async (req, res) => {
  const { username, friendUsername } = req.body;
  const user = await User.findOne({ username });
  const friend = await User.findOne({ username: friendUsername });

  if (!user || !friend) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (user.friends.includes(friendUsername)) {
    return res.status(400).json({ message: 'Friend already added' });
  }

  user.friends.push(friendUsername);
  await user.save();
  res.json({ message: 'Friend added successfully' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

