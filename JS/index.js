import { render } from "./Render.js";

const url = `http://127.0.0.1:8000`;

const cointerner = document.querySelector(".cointerner");

let userNameValue, passwordValue, user;
const getInfo = (user) => {
  const sinUp_p = document.querySelector("#singUp");
  const login = document.querySelector("#login");
  if (user == undefined) {
    sinUp_p.dataset.singUp = "Błędne dane";
    sinUp_p.innerText = "Błędne dane";
  } else {
    sinUp_p.dataset.singUp = "Zalogowano";
    sinUp_p.innerText = "Zalogowano";
    localStorage.setItem("user", JSON.stringify(user));
    if (localStorage.getItem("user") != undefined) {
      const u = localStorage.getItem("user");
      login.remove();
      const div = render();
      cointerner.appendChild(div);
    }
  }
};

const singIn = (event) => {
  event.preventDefault();
  const userName = document.getElementById("username");
  const password = document.getElementById("passworduser");
  console.log("Zalogowano");
  userNameValue = userName.value;
  console.log(userNameValue);
  passwordValue = password.value;
  console.log(passwordValue);
  const URL = `${url}/users`;
  fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      user = response.filter(
        (element) =>
          element.username == userNameValue &&
          element.hashed_password == passwordValue
      )[0];
      getInfo(user);
    });
};

if (localStorage.getItem("user") != undefined) {
  const u = localStorage.getItem("user");
  const div = render();
  cointerner.appendChild(div);
} else {
  const tpl = document.createElement("template");
  tpl.innerHTML = `<article id="login">
	<p  id="singUp"></p>
	<form action="">
		<label for="username">Nazwa uytkowniaka:</label>
		<input type="text" name="username" id="username">
		<label for="passworduser">Hasło: </label>
		<input type="password" name="passworduser" id="passworduser">
		<button id="btn_sinUp">Zaloguj się</button>
	</form>
	<p><a href="./singup.html">Jeśli nie maź konta zajestruj sie tu</a></p>
  </article>`;
  cointerner.appendChild(tpl.content);
  const btn_sinUp = document.querySelector("#btn_sinUp");
  btn_sinUp.addEventListener("click", singIn);
}
