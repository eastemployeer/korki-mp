
import TaskService from "../service/TaskService";


// TO DO
// 1. Stworzyć obiekt task z nazwa, czasem od kiedy do kiedy zadanie ma być wykonane, stan zadania
// zrobione(przekreślone) czy nie oraz wazne zadanie bedzie oznaczone czerwonym kolorem
//2. Po lewej stronie wyświetla sie lista zadań na dany dzień z godziną ważne zadania wyświtlają sie na czerwona.
// Kwadrat z datą zadania ważnego jest czerwony..
//Przekreślone zadania można usunac podwójnym kliknięciem.
//2. Stworzyć funkcje która bedzie dodawała zadanie do danego dnia.
//3 Formularz ma sie pojawaić na klikniecie w przycisk plus w lewym dolnym rogu ekranu.
//Ma sie w nim znaleźć nazwa zadania od kiedy do kiedy ma trwać. Przycisk Add Task dodaje zadanie.
// Przycisk zamknij zamyka formularz
//



export default class FormManager {
    #id;
    #inputFields = [];
    #submitButtonMessage = 'Send';
    #submitCallback;
    #cancelCallback;
    #formHeaderText = '';
    #formState = {};

    constructor({
                    id,
                    inputFields = [],
                    submitButtonMessage = 'SEND',
                    submitCallback = function () {},
                    cancelCallback = function () {},
                    formHeaderText = ''
                }) {
        this.#id = id;
        this.#inputFields = inputFields;
        this.#submitButtonMessage = submitButtonMessage;
        this.#submitCallback = submitCallback;
        this.#cancelCallback = cancelCallback;
        this.#formHeaderText = formHeaderText;
    }

    createForm() {
        const formHeader = document.createElement('h3');
        formHeader.className = 'mt-3';
        formHeader.textContent = this.#formHeaderText;


        const formElement = document.createElement('form');
        formElement.id = this.#id;

        formElement.appendChild(formHeader);


        this.#inputFields.forEach(inputField => formElement.appendChild(this.#createInputField(inputField)));
        formElement.appendChild(FormManager.#createSubmitButton(this.#submitButtonMessage));
        formElement.appendChild(this.#createCancelButton());
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.#submitCallback(this.#formState);
        })

        return formElement;
    }

    #createInputField({id, label, type}) {
        const formGroupElement = document.createElement('div');
        formGroupElement.className = 'form-group';

        const labelElement = document.createElement('label');
        labelElement.textContent = label;

        if (type === 'checkbox') labelElement.className = 'form-check-label';
        else labelElement.className = 'form-label';

        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', type);
        inputElement.id = id;
        inputElement.className = 'form-control';

        if (type === 'checkbox') inputElement.className = 'form-check-input';
        else inputElement.className = 'form-control';

        inputElement.addEventListener('input', (event) => {
            const changeData = {};
            changeData[id] = event.target.value;
            this.#formState = {... this.#formState, ... changeData};
        })

        formGroupElement.appendChild(labelElement);
        formGroupElement.appendChild(inputElement);
        return formGroupElement;
    }

    static #createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();

        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-success mt-2'
        buttonElement.setAttribute('type', 'submit');
        buttonElement.textContent = formattedMessage;

        return buttonElement;
    }

    #createCancelButton() {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-danger mt-2';
        buttonElement.setAttribute('type', 'button');
        buttonElement.textContent = 'CANCEL';

        return buttonElement;
    }
}
