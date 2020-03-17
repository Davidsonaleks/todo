import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { model, Schema } from "mongoose"
import { TGraphQLObjectType } from "../../types"
import { TaskModel, TaskSchema } from "../task/task"

export const CategorySchema: TGraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLString },
    tasks: {
      type: GraphQLList(TaskSchema),
      resolve: async parent => {
        const tasks = await TaskModel.find({ category: parent.id })
        return tasks
      },
    },
  }),
})

export const CategoryMongooseSchema = new Schema({
  name: { type: String },
  color: { type: String },
})

export const CategoryModel = model("Category", CategoryMongooseSchema)
