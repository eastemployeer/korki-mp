import Task from "../Task/Task";
import TaskStorage from "./TaskStorage";


export default class TaskService {
    #taskStorage

    constructor(taskStorage) {
        this.#taskStorage = taskStorage;
    }

    getAll() {
        return this.#taskStorage.getAll();
    }

    get(date) {
        return this.#taskStorage.get(date);
    }

    add(date, task) {
        if (this.#taskStorage.hasTaskForDate(date, task)) {
            throw new Error('Task already exists for given date');
        }
        this.#taskStorage.add(date, task)
    }

    deleteByDate(date) {
        this.deleteByDate(date)
    }

    deleteDoneTasksFrom(date) {
        this.deleteDoneTasksFrom(date)
    }

    // todo zastanow sie co chcesz miec w kalendarzu

}

