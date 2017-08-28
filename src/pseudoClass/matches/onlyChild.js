
export default function (element) {
	return !element.previousElementSibling && !element.nextElementSibling;
}
