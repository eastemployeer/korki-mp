
export default class TaskPanel {
    constructor(storage, date) {
        this.storage = storage;
        this.date = date;
        this.panel = this.#createPanel();
    }

    #createPanel() {
        const tasks = this.storage.get(this.date);
        console.log(tasks);
        if(!tasks) return;

        const panel = document.createElement('div');
        for (const task of tasks) {
            const taskEl = this.#createPanelItem(task);
            panel.appendChild(taskEl);
        }

        return panel;
    }

    addPanelToParent(parent) {
        if (parent && this.panel) {
            parent.appendChild(this.panel);
        }
    }

    renderSetDoneTaskButton() {
        const setDoneButton = document.createElement('button');
        // 1. Stworzyc przycisk
        // 2. Dodac do przycisku ikonkę jako child (checkmark) (przycisk nie powinien miec zadnego tekstu)
        // 3. Dodac eventListenera na click event który zupdatuje tego taska w taskStorage'u (zmieniu mu wartosc pola isFinished na true)
        // 4. + w eventListenerze jeszcze musisz dodac zeby ten button sie usuwal po kliknieciu i zeby dodawała się do eventEl klasa finished (text-decoration: cross-over)
        //5. Dodac buttona do eventEl 
    }

    addDeleteAction() {
        //1. Dodac eventListnera do eventEl który bedzie nasłuchiwał zdarzenia dblclick
        //2. Po takim zdarzeniu usun task z taskStorage (musisz dodac nowa funckje do taskStorage np. deleteSpecificTask(task))
        //3. Po usunięciu taska z taskStorage'a musisz usunać cały eventEl
    }

    #createPanelItem(task) {
        const eventEl = document.createElement('div');
        eventEl.classList.add('panelItem');
        eventEl.innerText = `${task.name}: ${task.startTime} - ${task.endTime}`;

        if (task.isImportant) eventEl.classList.add('important');

        if (task.isFinished) eventEl.classList.add('finished');
        else this.renderSetDoneTaskButton();

        this.addDeleteAction();

        return eventEl;
    }


}