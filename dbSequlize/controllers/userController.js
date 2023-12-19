const User = require('../models/userModel');

async function createUser(req, res) {
  try {
    const { firstName, lastName } = req.body;
    const newUser = await User.create({ firstName, lastName });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findAll({id:req.params.id});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    await User.update(updatedData, { where: { id: userId } });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
