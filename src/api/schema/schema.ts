import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { CategoryMutation } from "../category/category-mutation"
import { CategoryQuery } from "../category/category-query"
import { TaskMutation } from "../task/task-mutation"
import { TaskQuery } from "../task/task-query"

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...TaskQuery,
    ...CategoryQuery,
  },
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...CategoryMutation,
    ...TaskMutation,
  },
})

export const rootQuery = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
