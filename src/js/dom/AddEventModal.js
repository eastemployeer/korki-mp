import FormManager from "./FormManager";
import Task from "../Task/Task";
import {v4 as uuid} from 'uuid';

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
// {id: uuid(), type: 'text', label: 'Custom label'}
//new Task(result);
const newEventModal = document.getElementById('newEventModal');

const INPUT_FIELDS = [
    {
        label: 'Name',
        id: 'name',
        type: 'text',
    },
    {
        label: 'Date',
        id: 'date',
        type: 'date',
    },
    {
        label: 'Start time',
        id: 'startTime',
        type: 'text',
    },
    {
        label: 'End time',
        id: 'endTime',
        type: 'text',
    },
    {
        label: 'Is this task important',
        id: 'isImportant',
        type: 'checkbox',
    },
]

export default class AddEventModal {
    constructor(storage, reloadCalendar) {
        this.reloadCalendar = reloadCalendar;
        this.storage = storage;
        this.addForm();
        this.addTrigger();
    }
    //function() {P}
    // () => {}

    formManager = new FormManager({
        id: uuid(),
        inputFields: INPUT_FIELDS,
        submitButtonMessage: 'Submit',
        submitCallback: (state) => this.onFormSubmit(state, this.storage, this.reloadCalendar),
        cancelCallback: () => {},
        formHeaderText: 'Add new event',
    });

    onFormSubmit(state, storage, reloadCalendar) {
        // state = {
        //     date: '2022-02-01',
        //     name: 'Kamil',
        //     startTime: '9:10',
        //     endTime: '9:15',
        //     isImportant: false,
        // }
        const {date, name, startTime, endTime, isImportant} = state;
        const task = new Task(date, name, startTime, endTime, isImportant === 'on' ? true : false, false);

        storage.add(date, task);
        newEventModal.style.display = 'none';
        console.log(storage.getAll());
        reloadCalendar();
    }


    addTrigger() {
        document.getElementById('addEventButton').addEventListener('click', () => {
            if (newEventModal.style.display !== 'block') newEventModal.style.display = 'block';
        })
    }

    addForm() {
        newEventModal.appendChild(this.formManager.createForm());
    }
}