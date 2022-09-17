const url = `http://127.0.0.1:8000`;
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("passworduser");
const saveUser = (event) => {
  event.preventDefault();
  const userNameValue = userName.value;
  const emailValue = email.value;
  const passwordValue = password.value;
<<<<<<< HEAD
  // ?name=wojtek&password=Wojtek92%21&email=wojtek
  // const URL = password=&email=${emailValue}
  const URL = `http://127.0.0.1:8000/add/user?name=${userNameValue}&password=${passwordValue}&email=${emailValue}`
=======
  // /user?name=wojtek&password=Wojtek92%21&email=wojtek
  const URL = `${url}/add/user/?name=${userNameValue}&password${passwordValue}&email=${emailValue}`;
>>>>>>> c731182770d8e650742591a4f293120bf1e18f6e
  fetch(URL, {method: "POST"})
    .then((res) => console.log(res))
    // .then((data) => {
    //   console.log(data);
    // })
    .catch((err) => console.log(err));
};

const btn = document.getElementById("btn");
btn.addEventListener("click", saveUser);
