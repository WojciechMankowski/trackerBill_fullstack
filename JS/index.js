import { render, renderList } from "./Render.js";

const url = `http://127.0.0.1:8000`;
const cointerner = document.querySelector(".cointerner");

let userNameValue, passwordValue, user, id;

const getBills = () => { 
  const URL =`${url}/bills`
  fetch(URL)
  .then(response => response.json())
  .then(response => {
    const bills = response.filter(element => {
      console.log(element)
      return element.user_id == id
    })
    const div = renderList(bills)
    cointerner.appendChild(div)
  })
// renderList
 }

const addNewBill = (event) => {
  event.preventDefault()
  const input_add_bills_name = document.querySelector('.input_add_bills_name').value
  const input_add_bills_date = document.querySelector('.input_add_bills_date').value
  const input_add_bills_value =document.querySelector('.input_add_bills_value').value
  const input_add_bills_category =  document.querySelector('.input_add_bills_category').value
  const URL = `${url}/add/bill/?name=${input_add_bills_name}&price=${input_add_bills_value}&category=${input_add_bills_category}&dae=${input_add_bills_date}&user_id=${id}`
  fetch(URL, {method: "POST"})
  .then(response => console.log(response))

}
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
  userNameValue = userName.value;
  passwordValue = password.value;
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
  const div = render();
  cointerner.appendChild(div);
  user = JSON.parse(localStorage.getItem('user'))
  id = user.id
  const input_add_bills_submit = document.querySelector('.input_add_bills_submit')
  input_add_bills_submit.addEventListener('click', addNewBill)
  getBills()
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
