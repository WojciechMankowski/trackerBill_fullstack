import { creatinElement } from "./createElement.js";
// renderowanie obiektów jak ktość jest zalogowany
export const render = () => {
    const element_div = creatinElement('div', 'add_bills');
    const element_form = creatinElement('form', 'form_add_bills');
    const element_input = creatinElement('input', 'input_add_bills_name');
    element_input.type = 'text';
    element_input.placeholder = 'Nazwa rachunku';
    const element_input2 = creatinElement('input', 'input_add_bills_value');
    element_input2.type = 'number';
    element_input2.placeholder = 'Wartość';
    const element_input3 = creatinElement('input', 'input_add_bills_date');
    element_input3.type = 'date';
    element_input3.placeholder = 'Data';
    const element_input_submit = creatinElement('input', 'input_add_bills_submit');
    element_input_submit.type = 'submit';
    element_input_submit.value = 'Dodaj';
    const element_input_reset = creatinElement('input', 'input_add_bills_reset');
    element_input_reset.type = 'reset';
    element_input_reset.value = 'Reset';
    element_form.appendChild(element_input);
    element_form.appendChild(element_input2);
    element_form.appendChild(element_input3);
    element_form.appendChild(element_input_submit);
    element_form.appendChild(element_input_reset);
    element_div.appendChild(element_form);
    return element_div;
};
