const User = require("../models/User");

const usersList = async (req, res) => {
  try {
    const currentUserRole = req.user.role;

    let users;

    if (currentUserRole === "admin") {
      users = await User.find();
    } else if (currentUserRole === "operations") {
      users = await User.find({ role: "operations" });
    } else {
      users = await User.find({ role: "sales" });
    }

    users = users.map((user) => {
      const { password, __v, createdAt, _id, ...userWithoutPassword } =
        user.toObject();
      return userWithoutPassword;
    });

    res.json({
      users,
      currentUser: { email: req.user.email, role: currentUserRole },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

module.exports = usersList;
