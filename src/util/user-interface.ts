import { observable } from "mobx"

export class WebUi {
  @observable isMobileMenu: boolean = false
  setMobileMenu(b: boolean) {
    this.isMobileMenu = b
  }

  @observable isLocker: boolean = false
  setLocker(b: boolean) {
    this.isLocker = b
  }

  @observable isDarkTheme: boolean = false
  setDarkTheme(b: boolean) {
    this.isDarkTheme = b
  }
}
export const userInterface = new WebUi()
