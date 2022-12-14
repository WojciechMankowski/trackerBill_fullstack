import { creatinElement } from './createElement.js'
import { renderChart } from './Chart.js'
// renderowanie obiektów jak ktość jest zalogowany
export const render = () => {
	const element_div = creatinElement('div', 'add_bills')
	const element_form = creatinElement('form', 'form_add_bills')
	const element_input = creatinElement('input', 'input_add_bills_name', 'input')
	const element_input2 = creatinElement('input', 'input_add_bills_value', 'input')
	const element_input3 = creatinElement('input', 'input_add_bills_date', 'input')
	const element_input_submit = creatinElement('input', 'input_add_bills_submit', 'button')
	const element_input_reset = creatinElement('input', 'input_add_bills_reset', 'button')
	const element_select = creatinElement('input', 'input_add_bills_category', 'input')
	const label1 = creatinElement('label', 'label')
	label1.innerText = 'Nazwa: '
	const label2 = creatinElement('label', 'label')
	label2.innerText = 'Wartość rachunku: '
	const label3 = creatinElement('label', 'label')
	label3.innerText = 'Data: '
	const label4 = creatinElement('label', 'label')
	label4.innerText = 'Kategoria'
	element_input.type = 'text'

	element_input2.type = 'number'
	element_input2.step = '0.01'

	element_input3.type = 'date'

	element_select.type = 'text'

	element_input_submit.type = 'submit'
	element_input_submit.value = 'Dodaj'

	element_input_reset.type = 'reset'
	element_input_reset.value = 'Reset'

	element_form.appendChild(label1)
	element_form.appendChild(element_input)
	element_form.appendChild(label2)
	element_form.appendChild(element_input2)

	element_form.appendChild(label3)
	element_form.appendChild(element_input3)
	element_form.appendChild(label4)
	element_form.appendChild(element_select)

	element_form.appendChild(element_input_submit)
	element_form.appendChild(element_input_reset)
	element_div.appendChild(element_form)
	return element_div
}

export const renderList = bills => {
	let categories = {}
	let categories_name = []
	const element_ul = creatinElement('ul', 'bills')
	bills.forEach(element => {
		categories_name.push(element.category)
		categories[element.category] = 0
	})
	bills.forEach(element => {
		const element_li = creatinElement('li', 'bill')
		const html = `
            <h2>${element.name}  ${element.price} zł. </h2> 
            <p class='category'> Kategoria: ${element.category}</p> <p class='data'> Data: ${element.date}
        `
		const price = categories[element.category] + element.price
		categories[element.category] = price
		element_li.innerHTML = html
		element_ul.appendChild(element_li)
	})
	const element_div = creatinElement('div', 'billsList')
	element_div.appendChild(element_ul)
	renderChart(categories, categories_name)
	return element_div
}

export const render_login = () => {
	const tpl = document.createElement('template')
	tpl.innerHTML = `<article id="login" class="login">
	<p  id="singUp"></p>
	<form action="">
		<label for="username">Nazwa uytkowniaka:</label>
		<input type="text" name="username" id="username">
		<br>
		<label for="passworduser">Hasło: </label>
		<br>
		<input type="password" name="passworduser" id="passworduser">
		<br>
		<button id="btn_sinUp">Zaloguj się</button>
	</form>
	<p><a href="./singup.html">Jeśli nie maź konta zajestruj sie tu</a></p>
  </article>`
	return tpl
}
