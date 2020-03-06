import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql"
import { TaskModel, TaskSchema } from "../task/task"

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    task: {
      type: TaskSchema,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        const task = TaskModel.findById(args.id)
        return task
      },
    },
    tasks: {
      type: GraphQLList(TaskSchema),
      resolve(_parent, _args) {
        return TaskModel.find({})
      },
    },
  },
})

export const rootQuery = new GraphQLSchema({
  query: Query,
})
