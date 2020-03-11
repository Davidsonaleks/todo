import { observable } from "mobx"

export class WebUi {
  @observable isMobileMenu: boolean = false

  @observable isLocker: boolean = false
  setLocker(b: boolean) {
    this.isLocker = b
  }
}
export const userInterface = new WebUi()
