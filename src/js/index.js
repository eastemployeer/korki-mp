import CalendarItem from "./dom/CalendarItem";



import TaskStorage from "./service/TaskStorage";
import Task from "./Task/Task";
import "../css/index.css";
import AddEventModal from "./dom/AddEventModal";
import TaskPanel from "./dom/TaskPanel";


let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
const works = document.getElementById('works_toDoList');
const tasksSection = document.getElementById('all-tasks');


function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';

    }

    backDrop.style.display = 'block';
}
function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month,0 ).getDate()
    const lastDayIndex = new Date(year, month + 1, 0).getDay();

    const dateString = firstDayOfMonth.toLocaleDateString('en-gb', {
        day: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'numeric'

    });
    let getDayCount = () => {
        return new Date(year, month, 0).getDate();
    }
    let getFirstDay = () => {
        let day = new Date(year, month - 1, 1).getDay();
        return day === 0 ? 7 : day;
    }

    let dayCountInCurrentMonth = getDayCount();
    let firstDayInCurrentMonth = getFirstDay();
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    console.log("PADDING DAYS: ", paddingDays)

    let days = Array(dayCountInCurrentMonth + paddingDays >= 35 ? 42 : 35).fill(0);

    document.getElementById('monthDisplay').innerText =
        `${ dt.toLocaleDateString ('en-gb', { month: 'long' }) }  ${year} `;

    calendar.innerHTML = '';



    days.forEach((e, index) => {
        const cd = new CalendarItem('day');
        const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(index +1  - paddingDays).padStart(2, '0')}`

        cd.setInnerText(index + 1- paddingDays);

        if(index < paddingDays){
            cd.setID('padding');
            cd.setInnerText(index + 1 - paddingDays + prevLastDay)
        }
        if (index + 1  - paddingDays === day && nav === 0) {
            cd.setID('currentDay')
        }
        if (index + 1 > daysInMonth + paddingDays){
            cd.setID('padding');
            cd.setInnerText(index - paddingDays - daysInMonth + 1 )
        }

        const tasks = taskStorage.get(dayString);
        if (tasks) tasks.forEach(task => cd.addTask(task));

        cd.addDaySquareToParent(calendar);
        cd.addAction(function() {
            tasksSection.innerHTML = '';
            const taskPanel = new TaskPanel(taskStorage, dayString);
            console.log('hello')
            taskPanel.addPanelToParent(tasksSection);
        })
    });
}






    // TO JEST TYLKO PRZYKLADOWY ZESTAW DANYCH, KTORE POTEM
    // WYKORZYSTAC W PROGRAMIE, KIEDY DANE WRZUCICSZ DO localStorage
    // WTEDY JUZ NIE WYWOLUJ TEGO KODU

    const tasks = [
        new Task('2001-02-09', 'Task 1', '09:10', '09:15').json(),
        new Task('2001-03-09', 'Task 2', '09:15', '09:20').json(),
        new Task('2001-03-09', 'Task 3', '09:20', '09:25').json(),
        new Task('2001-03-09', 'Task 4', '09:25', '09:30').json()
    ]
    localStorage.setItem('tasks', JSON.stringify(tasks))

    const taskStorage = new TaskStorage('tasks');
    // new AddEventModal(taskStorage);

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    // document.getElementById('saveButton').addEventListener('click', saveEvent);
    // document.getElementById('cancelButton').addEventListener('click', closeModal);
    // document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    // document.getElementById('closeButton').addEventListener('click', closeModal);
    //document.getElementById('complete').addEventListener('click', checkClick)
}

new AddEventModal(taskStorage, load);
initButtons();
load();
