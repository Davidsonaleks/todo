import { observable } from "mobx"

export class DarkTheme {
  @observable isDarkTheme: boolean = false
  setDarkTheme(b: boolean) {
    this.isDarkTheme = b
  }
}
