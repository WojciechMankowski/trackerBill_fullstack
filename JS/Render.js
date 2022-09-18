import { creatinElement } from "./createElement.js";
// renderowanie obiektów jak ktość jest zalogowany
export const render = () => {
    const element_div = creatinElement('div', 'add_bills');
    const element_form = creatinElement('form', 'form_add_bills');
    const element_input = creatinElement('input', 'input_add_bills_name');
    const element_input2 = creatinElement('input', 'input_add_bills_value');
    const element_input3 = creatinElement('input', 'input_add_bills_date');
    const element_input_submit = creatinElement('input', 'input_add_bills_submit');
    const element_input_reset = creatinElement('input', 'input_add_bills_reset');
    const element_select = creatinElement('input', 'input_add_bills_category')
    
    element_input.type = 'text';
    element_input.placeholder = 'Nazwa rachunku';

    element_input2.type = 'number';
    element_input2.placeholder = 'Wartość';
    element_input2.step = '0.01';



    element_input3.type = 'date';
    element_input3.placeholder = 'Data';

    element_select.type = 'text'
    element_select.placeholder = "Kategoria"

    element_input_submit.type = 'submit';
    element_input_submit.value = 'Dodaj';

    element_input_reset.type = 'reset';
    element_input_reset.value = 'Reset';

    element_form.appendChild(element_input);
    element_form.appendChild(element_input2);
    element_form.appendChild(element_input3);
    element_form.appendChild(element_select)
    element_form.appendChild(element_input_submit);
    element_form.appendChild(element_input_reset);
    element_div.appendChild(element_form);
    return element_div;
};

export const renderList = (bills) => {
    const element_ul = creatinElement('ul', "bills")
    bills.forEach(element => {
        const element_li = creatinElement('li', "bill")
        const html = `
            <h2>${element.name}  ${element.price} zł. </h2> 
            <p> Kategoria: ${element.category}</p> <p> Data: ${element.date}
        `
        element_li.innerHTML = html
        element_ul.appendChild(element_li)
    });
    const element_div = creatinElement('div', 'billsList')
    element_div.appendChild(element_ul)
    return element_div
}
