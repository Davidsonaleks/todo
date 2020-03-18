import { ValidationError } from "apollo-server-errors"
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql"
import { TSchemaField } from "../../types"
import { TaskModel, TaskSchema } from "./task"

export const TaskQuery: TSchemaField = {
  task: {
    type: TaskSchema,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(_parent, args) {
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
    type: GraphQLList(TaskSchema),
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
