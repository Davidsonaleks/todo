import { observable } from "mobx"
import { WebHome_tasks } from "./types/WebHome"

export class HomeTasksModel {
  tasks = observable.array<WebHome_tasks>([], { deep: false })

  setTasks(categories: WebHome_tasks[]) {
    this.tasks.replace(categories)
  }

  checkBoxChange(id: string, isCheck: boolean) {
    const task = this.tasks.find(task => task.id === id)
    if (task) {
      task.isDone = !isCheck
    }
  }
}
