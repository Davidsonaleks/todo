import { ValidationError } from "apollo-server-errors"
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql"
import { TSchemaField } from "../../types"
import { CREATED_ID } from "../../util/common"
import { defaultTask, TaskModel, TaskSchema } from "./task"

export const TaskQuery: TSchemaField = {
  task: {
    type: new GraphQLNonNull(TaskSchema),
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(_parent, args) {
      if (args.id === CREATED_ID) {
        return defaultTask
      }
      const task = TaskModel.findById(args.id, err => {
        if (err) throw err
      })
      if (!task) {
        throw new ValidationError("not found")
      }
      return task
    },
  },
  tasks: {
    type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(TaskSchema))),
    resolve(_parent, _args) {
      const tasks_list = TaskModel.find(
        {},
        null,
        { sort: { isDone: false, createdAt: -1 } },
        err => {
          if (err) throw err
        }
      )
      if (!tasks_list) {
        throw new ValidationError("not found")
      }
      return tasks_list
    },
  },
}
