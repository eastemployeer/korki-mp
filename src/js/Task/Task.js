export default class Task {
    // todo dolozyc warstwe waliddujaca, ktora sprawdza czy dane podane do task-a
    //  sa prawidlowe
    constructor(date, name, startTime, endTime, isImportant, isFinished) {
        this.date = date;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isImportant = isImportant;
        this.isFinished = isFinished;
    }

    toString() {
        return `${this.date} ${this.name}${this.startTime} ${this.startTime}`
    }


    json() {
        return JSON.stringify(this)
    }

}