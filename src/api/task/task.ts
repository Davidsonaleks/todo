import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"
import { model, Schema } from "mongoose"

export const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
})
const t = new Schema({
  name: { type: String },
  isDone: { type: Boolean },
})
export const TaskModel = model("task", t)
