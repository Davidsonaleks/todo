import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"
import { GraphQLDateTime } from "graphql-iso-date"
import { model, Schema } from "mongoose"
import { TGraphQLObjectType } from "../../types"
import { CategoryModel, CategorySchema } from "../category/category"

export const TaskSchema: TGraphQLObjectType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
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
  createdAt: { type: Date, default: Date.now },
})

export const TaskModel = model("Task", t)
