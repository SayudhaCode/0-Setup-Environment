export default (text = 'Sayudha Lukita Wibisana') => {
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
};
