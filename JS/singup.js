const url = `http://127.0.0.1:5000`;
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("passworduser");
const saveUser = (event) => {
  event.preventDefault();
  const userNameValue = userName.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  const URL = `${url}/add/user/${userNameValue}/${emailValue}/${passwordValue}`;
  fetch(URL, {method: "POST"})
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

const btn = document.getElementById("btn");
btn.addEventListener("click", saveUser);
