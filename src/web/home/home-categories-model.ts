import { observable } from "mobx"
import { WebHome_categories } from "./types/WebHome"

export class HomeCategoriesModel {
  categories = observable.array<WebHome_categories>([], { deep: false })

  setCategories(categories: WebHome_categories[]) {
    this.categories.replace(categories)
  }

  @observable
  isPopup: boolean = false

  setPopup(b: boolean) {
    this.isPopup = b
  }
}
