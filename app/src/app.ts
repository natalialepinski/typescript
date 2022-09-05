import { NegotiationController } from "./controllers/negotiation-controller.js";

const controller = new NegotiationController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.add();
    });
} else {
    throw Error('Form does not exist.')
}

const importButton = document.querySelector('#import');
if (importButton) {
    importButton.addEventListener('click', () => {
        controller.importData();
    });
} else {
    throw Error('Import button does not exist.')
}
