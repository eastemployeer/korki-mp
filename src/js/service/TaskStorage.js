/*
    Dzieki temu, ze wydzielilem do TaskStorage cala logike zwiazana z zarzadzaniem
    pula taskow, ktore sa przechowywanew localStorage, to w momencie kiedy bede
    chcial zmienic zrodlo danych (np. Firebase albo typowy backend), wtedy zmian
    dokonam tutaj.

    Jezeli zajdzie taka potrzeba to wszelkieo operacje dodaj zmodyfikuj usun robisz tutaj
*/
import TaskService from "./TaskService";
import Task from "../Task/Task";
export default class TaskStorage {
    #key
    #taskGroupByDate

    constructor(key) {
        this.#key = key;

        // Na ten moment w localStorage masz w json pod kluczem tasks tablice taskow
        this.#taskGroupByDate = JSON.parse(localStorage.getItem(key)).reduce((groupedByDate, task, idx, arr) => {

            const parseTask = JSON.parse(task)
            // Jezeli w mapie juz byl klucz z data, to wtedy dodajesz nowy parseTask
            // todo zastanow sie nad tym kode i skrocimy go na jednym z kolejnych spotkan

            console.log(`${parseTask.date} ... ${groupedByDate.has(parseTask.date)}`)
            if (groupedByDate.has(parseTask.date)) {
                groupedByDate.get(parseTask.date).push(parseTask)
            } else  {
                // w przeciwnym razie jezeli nie bylo jeszcze daty w mapie, to robisz nowa pare
                // ta wlasnie data + lista z jednym poki co taskiem spod tej daty
                groupedByDate.set(parseTask.date, [parseTask]);
            }
            return groupedByDate;
        }, new Map())
    }

    getAll() {
        return this.#taskGroupByDate;
    }

    get(date) {
        return this.#taskGroupByDate.get(date);
    }

    hasTaskForDate(date, task) {
        return this.#taskGroupByDate.get(date).some(t => t.json() === task.json());
    }

    // o tej porze date jest juz napisem
    // musimy ustalic czy data jest juz w mapie
    // jezeli data jest juz w mapie, wtedy dodajesz do jej listy kolejny task
    // a jak daty nie ma w mapie to robisz nowy klucz i przypisana mu liste jednoelementowa
    //Map [
    //     '2022-02-01' -> ['1', '2', '3'],
    //     '2022-02-02' -> ['4', '5', '6']
    // ]
    add(date, task) {
        if(this.#taskGroupByDate.has(date)) {
            this.#taskGroupByDate.get(date).push(task);
        } else {
            this.#taskGroupByDate.set(date, [task])
        }
        // localStorage.setItem('tasks', this.#taskGroupByDate);
    }

    // todo dodac nastepujaca funkcjonalnosci:

    //  1. usuwanie claej pary klucz - wartosci po podanej dacie
    deleteByDate(date) {
        this.#taskGroupByDate.delete(date)
    }

    //  2. usuwanie wszystkich wykonanych taskow z puli taskow spod wybranej daty
    deleteDoneTasksFrom(date) {
        const undoneTasksFromDate = this.#taskGroupByDate.get(date).filter(task => !task.done)
        this.#taskGroupByDate.set(task.date, undoneTasksFromDate);
    }
}
