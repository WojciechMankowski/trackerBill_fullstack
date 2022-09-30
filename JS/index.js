import { render, renderList, render_login } from './Render.js';

const url = `http://127.0.0.1:8000`;
const cointerner = document.querySelector('.cointerner');

let userNameValue, passwordValue, user, id;

const getBills = () => {
	const URL = `${url}/bills`;
	fetch(URL)
		.then((response) => response.json())
		.then((response) => {
			if (response.detail != 'No bills found') {
				const bills = response.filter((element) => {
					return element.user_id == id;
				});
				const div = renderList(bills);
				cointerner.appendChild(div);
			} else {
				console.log(response.detail);
			}
		});
};

const addNewBill = (event) => {
	event.preventDefault();
	const input_add_bills_name = document.querySelector(
		'.input_add_bills_name'
	).value;
	const input_add_bills_date = document.querySelector(
		'.input_add_bills_date'
	).value;
	const input_add_bills_value = document.querySelector(
		'.input_add_bills_value'
	).value;
	const input_add_bills_category = document.querySelector(
		'.input_add_bills_category'
	).value;
	const URL = `${url}/add/bill/${input_add_bills_name}/${input_add_bills_value}/${input_add_bills_category}/${input_add_bills_date}/${id}`;
	fetch(URL, { method: 'POST' }).then((response) =>
		console.log(response.status)
	);
};

const getInfo = (user) => {
	const sinUp_p = document.querySelector('#singUp');
	const login = document.querySelector('#login');
	if (user == undefined) {
		sinUp_p.dataset.singUp = 'Błędne dane';
		sinUp_p.innerText = 'Błędne dane';
	} else {
		sinUp_p.dataset.singUp = 'Zalogowano';
		sinUp_p.innerText = 'Zalogowano';
		localStorage.setItem('user', JSON.stringify(user));
		if (localStorage.getItem('user') != undefined) {
			const u = localStorage.getItem('user');
			login.remove();
			const div = render();
			cointerner.appendChild(div);
		}
	}
};

const singIn = (event) => {
	event.preventDefault();
	const userName = document.getElementById('username');
	const password = document.getElementById('passworduser');
	userNameValue = userName.value;
	passwordValue = password.value;
	const URL = `${url}/users`;
	fetch(URL)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			user = response.filter(
				(element) =>
					element.username == userNameValue &&
					element.hashed_password == passwordValue
			)[0];
			getInfo(user);
			getBills();
		});
};
const singOut = (event) => {
	localStorage.removeItem('user');
	window.onload;
};
if (localStorage.getItem('user') != undefined) {
	const div_login = document.querySelector('.login');
	if (div_login != null) div_login.remove();
	const div = render();
	window.onload;
	const logo = document.querySelector('.logo');
	const button = document.createElement('button');
	button.addEventListener('click', singOut);
	button.innerText = 'Wyloguj się';
	logo.appendChild(button);
	cointerner.appendChild(div);
	user = JSON.parse(localStorage.getItem('user'));
	id = user.id;
	const input_add_bills_submit = document.querySelector(
		'.input_add_bills_submit'
	);
	input_add_bills_submit.addEventListener('click', addNewBill);
	getBills();
} else {
	const tpl = render_login();
	cointerner.appendChild(tpl.content);
	const btn_sinUp = document.querySelector('#btn_sinUp');
	btn_sinUp.addEventListener('click', singIn);
}
