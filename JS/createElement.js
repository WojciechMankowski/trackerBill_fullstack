// div
export const creatinElement = (noto, clasName) => {
    const element = document.createElement(noto);
    element.classList.add(clasName);
    return element;
}