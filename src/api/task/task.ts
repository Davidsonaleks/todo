import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql"

export const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    isDone: { type: GraphQLBoolean },
  }),
})
