import { ValidationError } from "apollo-server-errors"
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import { TSchemaField } from "../../types"
import { CategoryModel, CategorySchema } from "./category"

export const CategoryMutation: TSchemaField = {
  addCategory: {
    type: GraphQLList(CategorySchema),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      color: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      const category = new CategoryModel({
        name: args.name,
        color: args.color,
      })
      await category.save()
      if (!category) {
        throw new ValidationError("not found")
      }
      const all = CategoryModel.find({})
      return all
    },
  },
  updateCategory: {
    type: GraphQLList(CategorySchema),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      color: { type: GraphQLString },
    },
    resolve: async (_parent, args) => {
      const updateTask = await CategoryModel.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          color: args.color,
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
  deleteCategory: {
    type: GraphQLList(CategorySchema),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_parent, args) => {
      const deleteCategory = await CategoryModel.findByIdAndRemove(args.id)
      if (!deleteCategory) {
        throw new ValidationError("not found")
      }
      const all = CategoryModel.find({})
      return all
    },
  },
}
