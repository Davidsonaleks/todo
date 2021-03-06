import { ValidationError } from "apollo-server-errors"
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import { TSchemaField } from "../../types"
import { TaskModel, TaskSchema } from "./task"

export const TaskMutation: TSchemaField = {
  addNewTask: {
    type: new GraphQLNonNull(TaskSchema),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
      category_id: { type: GraphQLID },
    },
    resolve: async (_parent, { isDone, name, category_id }) => {
      const task = new TaskModel({
        name,
        isDone,
        category: category_id,
      })
      const newTask = await task.save()
      if (!newTask) {
        throw new ValidationError("not found")
      }

      return newTask
    },
  },
  removeTask: {
    type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(TaskSchema))),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_parent, args) => {
      const deleteTask = await TaskModel.findByIdAndRemove(args.id)
      if (!deleteTask) {
        throw new ValidationError("not found")
      }
      const tasks_list = TaskModel.find(
        {},
        null,
        { sort: { isDone: false, createdAt: -1 } },
        err => {
          if (err) throw err
        }
      )
      return tasks_list
    },
  },
  removeTaskItem: {
    type: TaskSchema,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_parent, args) {
      const deleteTask = TaskModel.findByIdAndRemove(args.id)
      if (!deleteTask) {
        throw new ValidationError("not found")
      }

      return deleteTask
    },
  },
  updateTask: {
    type: GraphQLList(TaskSchema),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve: async (_parent, args) => {
      const updateTask = await TaskModel.findByIdAndUpdate(
        args.id,
        {
          isDone: args.isDone,
        },
        { new: true }
      )
      if (!updateTask) {
        throw new ValidationError("not found")
      }
      const tasks_list = TaskModel.find(
        {},
        null,
        { sort: { isDone: false, createdAt: -1 } },
        err => {
          if (err) throw err
        }
      )

      return tasks_list
    },
  },
  updateTaskItem: {
    type: TaskSchema,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
      category_id: { type: GraphQLID },
    },
    resolve: async (_parent, args) => {
      const updateTask = await TaskModel.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          isDone: args.isDone,
          category: args.category_id,
        },
        { new: true }
      )

      if (!updateTask) {
        throw new ValidationError("not found")
      }

      return updateTask
    },
  },
}
