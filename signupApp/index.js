const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

 
function readUsersFromFile() {
  try {
    const usersData = fs.readFileSync('users.json');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
}

 
function writeUsersToFile(users) {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

 
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const users = readUsersFromFile();

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.send('Username already exists. Please choose another.');
  }

  users.push({ username, password });
  writeUsersToFile(users);

  res.send('Signup successful! <a href="/login">Login</a>');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

 
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = readUsersFromFile();

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.send('Invalid username or password. <a href="/login">Try again</a>');
  }

  res.send(`Welcome, ${username}!`);
});

 
app.get('/users', (req, res) => {
  const users = readUsersFromFile();
const resData=users.map(({password,...user})=>{
    return user
})
  res.send(resData);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
