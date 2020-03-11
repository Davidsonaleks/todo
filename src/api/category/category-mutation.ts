import { ValidationError } from "apollo-server-errors"
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
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
  updateCategory: {
    type: GraphQLList(CategorySchema),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent, args) => {
      const updateTask = await CategoryModel.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
        },
        { new: true }
      )
      if (!updateTask) {
        throw new ValidationError("not found")
      }
      const all = CategoryModel.find({})
      return all
    },
  },
}
