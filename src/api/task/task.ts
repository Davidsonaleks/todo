import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql"
import { model, Schema } from "mongoose"

export const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isDone: { type: GraphQLBoolean },
  }),
})

const t = new Schema({
  name: String,
  isDone: Boolean,
})
export const TaskModel = model("Task", t)
