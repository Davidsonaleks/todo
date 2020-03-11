import { ValidationError } from "apollo-server-errors"
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql"
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
  category: {
    type: CategorySchema,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(_parent, args) {
      const cat = CategoryModel.findById(args.id)
      // if (!cat) {
      //   throw new ValidationError("not found")
      // }
      return cat
    },
  },
}
