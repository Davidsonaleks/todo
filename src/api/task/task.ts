import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"
import { model, Schema } from "mongoose"
import { CategoryModel, CategorySchema } from "../category/category"

export const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
    category: {
      type: CategorySchema,
      resolve: async parent => {
        const category = await CategoryModel.findById(parent.category)
        return category
      },
    },
  }),
})

const t = new Schema({
  name: { type: String },
  isDone: { type: Boolean },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
})

export const TaskModel = model("Task", t)
