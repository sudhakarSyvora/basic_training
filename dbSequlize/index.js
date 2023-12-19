const express = require("express");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/database");
const app = express();


app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
 
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
