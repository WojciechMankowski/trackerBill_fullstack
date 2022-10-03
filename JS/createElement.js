export const creatinElement = (noto, className, classInput = '') => {
	const element = document.createElement(noto);
	element.classList.add(className);
	element.className += ` ${classInput}`;
	return element;
};
