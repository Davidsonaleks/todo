import { ValidationError } from "apollo-server-errors"
import { GraphQLList } from "graphql"
import { TSchemaField } from "../../types"
import { CategoryModel, CategorySchema } from "./category"

export const CategoryQuery: TSchemaField = {
  categories: {
    type: GraphQLList(CategorySchema),
    resolve(_parent, _args) {
      const tasks_list = CategoryModel.find({}, err => {
        if (err) throw err
      })
      if (!tasks_list) {
        throw new ValidationError("not found")
      }
      return tasks_list
    },
  },
}
