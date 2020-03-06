import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { TaskSchema } from "../task/task"

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    task: {
      type: TaskSchema,
      args: { id: { type: GraphQLString } },
      resolve() {},
    },
  },
})

export const rootQuery = new GraphQLSchema({
  query: Query,
})
