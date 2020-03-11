import { GraphQLNonNull, GraphQLString } from "graphql"
import { TSchemaField } from "../../types"
import { CategoryModel, CategorySchema } from "./category"

export const CategoryMutation: TSchemaField = {
  addCategory: {
    type: CategorySchema,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, args) => {
      const category = new CategoryModel({
        name: args.name,
      })

      return category.save()
    },
  },
}
