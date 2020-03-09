import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"
import { TaskModel, TaskSchema } from "../task/task"

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    task: {
      type: TaskSchema,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNewTask: {
      type: TaskSchema,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(_parent, { isDone, name }) {
        const task = new TaskModel({
          name,
          isDone,
        })
        const newTask = task.save()

        return newTask
      },
    },
    removeTask: {
      type: TaskSchema,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args) {
        const deleteTask = TaskModel.findByIdAndRemove(args.id)
        return deleteTask
      },
    },
    updateTask: {
      type: TaskSchema,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(_parent, args) {
        const updateTask = TaskModel.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            isDone: args.isDone,
          },
          { new: true }
        )
        return updateTask
      },
    },
  },
})

export const rootQuery = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
