function showMessage(input, message, type) {

	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;

	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validateName(input, requiredMsg, invalidMsg) {

	if (!hasValue(input, requiredMsg)) {
		return false;
	}

	const nameRegex =
		/^(([a-zA-Z]{2,}))$/;

	const name = input.value.trim();
	if (!nameRegex.test(name)) {
		return showError(input, invalidMsg);
	}
	return true;
}


function validateEmail(input, requiredMsg, invalidMsg, tooltipMsg) {

	if (!hasValue(input, requiredMsg)) {
		return false;
	}

      var tooltip = document.getElementById('email');

	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
     		tooltip.title = tooltipMsg;
		return showError(input, invalidMsg);
	}
	tooltip.title = '';
	return true;
}

function validatePassword(input, compare, requiredMsg, invalidMsg) {

	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	
	if (input.value.trim() !== compare.value.trim()) {
 	return showError(input, invalidMsg);
	}
	return true;
}

function hasLength(input, maxlength, invalidMsg) {

	if(input.value.length > maxlength) {
	return showError(input, invalidMsg);
	}
	return true;
}


const form = document.querySelector("#createaccount");

const NAME_REQUIRED = "Rellene este campo";
const NAME_INVALID = "Nombre no puede contener números";
const EMAIL_REQUIRED = "Rellene este campo";
const EMAIL_INVALID = "Email inválido";
const PASSWORD_REQUIRED = "Rellene este campo";
const PASSWORD_INVALID = "No debe tener más de 8 caracteres";
const CONFIRMATION_REQUIRED = "Rellene este campo";
const CONFIRMATION_INVALID = "Las contraseñas no coinciden";
const TOOLTIP_MESSAGE = "La dirección de correo no es correcta. Asegúrate lleve @ y un subdominio de envío válidos";

form.addEventListener("submit", function (event) {
	// Para el envío del form, hasta que se revise
	event.preventDefault();

	// Valida los campos del Form

	let nameValid = validateName(form.elements["name"], NAME_REQUIRED, NAME_INVALID);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID, TOOLTIP_MESSAGE);
	let passwordValid = hasValue(form.elements["password"], PASSWORD_REQUIRED);
	let passwordlength = hasLength(form.elements["password"], 8, PASSWORD_INVALID);
	let confirmationValid = validatePassword(form.elements["confirmation"], form.elements["password"], CONFIRMATION_REQUIRED, CONFIRMATION_INVALID);
	// Si todo está correcto, envía el Form.
	if (nameValid && emailValid && passwordValid && passwordlength && confirmationValid) {
		alert("La inscripción se ha realizado correctamente");
	}
});