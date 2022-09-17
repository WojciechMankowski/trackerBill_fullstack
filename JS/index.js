const url = `http://127.0.0.1:8000`;
const userName = document.getElementById('username');
const password = document.getElementById('passworduser');
const sinUp_p = document.querySelector('#singUp')
let userNameValue, passwordValue, user;
const getInfo = (user) => { 
    if (user == undefined){
        sinUp_p.dataset.singUp = 'Błędne dane'
        console.log('Błędne dane')}
 }
const singIn = (event) => {
	event.preventDefault();
	userNameValue = userName.value;
	passwordValue = password.value;
	const URL = `${url}/users`;
	fetch(URL)
		.then((response) => response.json())
		.then(
			(response) =>
				{
                    user = response.filter(element => element.username == userNameValue && element.hashed_password == passwordValue)[0];
                    getInfo(user)
                }
		);
    
    
};

const btn_sinUp = document.querySelector('#btn_sinUp');
btn_sinUp.addEventListener('click', singIn);

