export default class CalendarItem {
    constructor(className) {
        this.daySquare = this.#createItem(className);
    }

    setInnerText(text){
        this.daySquare.innerText = text;
    }
    setID(id){
        this.daySquare.id = id;
    }

    addTask(task){
        this.taskEl = document.createElement('div');
        this.taskEl.classList.add('task');
        this.taskEl.innerText = task.name;

        if (task.isImportant) this.daySquare.classList.add('important');
        if (task.isFinished) this.eventEl.classList.add('finished');

        this.daySquare.appendChild(this.taskEl);
    }

    changeClass = (className) => {
        this.daySquare.classList = className;
    }

    addAction = (actionFn) =>{
        this.daySquare.addEventListener('click', actionFn)
    }

    addDaySquareToParent(parent) {
        if (parent) {
            parent.appendChild(this.daySquare)
        }
    }

    #createItem(className) {
        this.daySquare = document.createElement('div');
        this.daySquare.classList.add(className);
        return this.daySquare;
    }
}


