const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
  return token;
};

const registerUser = async (req, res) => {
  try {
    let { email, username, password, firstName, lastName, gender, role } = req.body;

    email = email.trim();
    username = username.trim();
    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    gender = gender.trim();
    role = role.trim();

    if (!email || !username || !password || !firstName || !lastName || !gender || !role) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format!' });
    }

    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Invalid username format!' });
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res.status(400).json({ message: 'First name and last name must contain only alphabetic characters!' });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: 'Password should be at least 4 characters long!' });
    }

    const allowedRoles = ['operations', 'sales', 'admin'];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid role! Role must be operations, sales, or admin.' });
    }

    const allowedGenders = ['male', 'female', 'other'];
    if (!allowedGenders.includes(gender.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid gender! Gender must be male, female, or other.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      role
    });

    await newUser.save();

    const tokenPayload = { userId: newUser._id, email: newUser.email, role: newUser.role };
    const token = generateToken(tokenPayload);

    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User created successfully', authorized: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const tokenPayload = { userId: user._id, email: user.email, role: user.role };
    const token = generateToken(tokenPayload);

    res.cookie('token', token, { httpOnly: true }); 

    res.status(200).json({ message: 'Login successful', authorized:true  });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

 
const logoutUser = (req, res) => {
  try {
     
    res.clearCookie('token', { httpOnly: true });

    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};

 

module.exports = { registerUser, loginUser ,logoutUser};
