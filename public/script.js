const baseURL = "https://testlapp.vercel.app";
var loadingElement =
  '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

function show(elementId) {
  document.getElementById("cred").style.display = "none";
  document.getElementById("usersBox").style.display = "none";
  if (elementId == "cred") {
    return (document.getElementById(elementId).style.display = "flex");
  }
  console.log(elementId, "elementID");
  document.getElementById(elementId).style.display = "block";
}

async function login() {

  const loginBtn = document.getElementById("loginBtn");
  loginBtn.innerHTML = loadingElement;
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    
    getUsersByRole();
    show("usersBox");
  } catch (error) {
    console.error("Login error:", error.response.data.message);
    displayError( 'loginError', error.response.data.message + "!");
  }
  loginBtn.innerHTML='Login'
}

async function register() {
  event.preventDefault();

  const registerBtn = document.getElementById("registerBtn");
  registerBtn.innerHTML = loadingElement;
  try {
    const email = document.getElementById("registerEmail").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const firstName = document.getElementById("registerFirstName").value;
    const lastName = document.getElementById("registerLastName").value;
    const gender = document.getElementById("registerGender").value;
    const role = document.getElementById("registerRole").value;

    if (!validateUsername(username)) {
      return displayError(
        "usernameError",
        "Username can only have [A-Z],[a-z],_,[0-9] and must be 4 character long"
      );
    }

    const res = await axios.post(`${baseURL}/auth/signup`, {
      email,
      username,
      password,
      firstName,
      lastName,
      gender,
      role,
    });
    if (res.data?.authorized) {
      getUsersByRole();
    }
  } catch (err) {
    displayError("registerError", err.response?.data?.message, "3500");
  }
  registerBtn.innerHTML = "Register";
}

async function getUsersByRole() {
  try {
    const response = await axios.get(`${baseURL}/usersList`);
    
    if (response.data?.authorized === false) {
      return show("cred");
    }

    if (response?.data?.users.length > 0) {
      const users = response?.data?.users;
      const usersTable = document.getElementById("usersList");

      usersTable.innerHTML = "";

      const headerRow = usersTable.insertRow();

      // Add SNO column at the beginning
      const snoHeader = document.createElement("th");
      snoHeader.textContent = "SNO";
      headerRow.appendChild(snoHeader);

      for (const key in users[0]) {
        if (Object.prototype.hasOwnProperty.call(users[0], key)) {
          const headerCell = document.createElement("th");
          headerCell.textContent = key.toUpperCase();
          headerRow.appendChild(headerCell);
        }
      }

      users.forEach((user, index) => {
        const row = usersTable.insertRow();

        // Insert SNO value
        const snoCell = row.insertCell();
        snoCell.textContent = index + 1;

        for (const key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            const cell = row.insertCell();
            cell.textContent = user[key];
          }
        }
      });

      let nameField = document.getElementById("email");
      nameField.innerText = response?.data?.currentUser?.email;

      let roleField = document.getElementById("role");
      roleField.innerText = response?.data?.currentUser?.role;

      show("usersBox");
    }
  } catch (error) {
    console.error("Error while displaying users:", error);
    return show("cred");
  }
}

getUsersByRole();

function logout() {
  axios
    .get(`${baseURL}/auth/logout`)
    .then((response) => {
      show("cred");
    })
    .catch((error) => {
      console.error("Logout error:", error.response.data.message);
    });
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]{4,}$/;
  return regex.test(username);
}

function displayError(elmId, message, time = "2500") {
  const element = document.getElementById(elmId);
  element.innerHTML = message + "!";
  setTimeout(() => {
    element.innerHTML = "";
  }, time);
}
