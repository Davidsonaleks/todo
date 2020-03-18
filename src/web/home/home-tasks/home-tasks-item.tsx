import { Card, CardContent, Checkbox, makeStyles, Typography } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useApollo, useUI } from "../../../di"
import { TTheme } from "../../theme"
import { useHomeContext } from "../home-ctx"
import { GqlHomeUpdateTask } from "../home-query"
import { WebHome_tasks } from "../types/WebHome"
import {
  WebUpdateTask,
  WebUpdateTaskVariables,
  WebUpdateTask_updateTask,
} from "../types/WebUpdateTask"

type THomeTaskItemProps = {
  task: WebHome_tasks
}

export const HomeTaskItem: FC<THomeTaskItemProps> = ({ task }) => {
  const ui = useUI()
  const classes = useStyles()
  const { categories_model, tasks_model } = useHomeContext()
  const category = categories_model.categories.find(category => category.id === task.category?.id)
  const apollo = useApollo()

  const checkBoxChange = async () => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebUpdateTask, WebUpdateTaskVariables>({
        mutation: GqlHomeUpdateTask,
        variables: {
          id: task.id,
          name: task.name,
          isDone: !task.isDone,
        },
      })
      if (r.data && r.data.updateTask) {
        const tasks = r.data.updateTask.filter(item => item && item) as WebUpdateTask_updateTask[]
        tasks_model.setTasks(tasks)
      }
      ui.setLocker(false)
    } catch (e) {
      console.error(e)
      ui.setLocker(false)
    }
  }

  return useObserver(() => (
    <Card className={classes.root}>
      <div
        className={classes.categoryBackground}
        style={{ background: category?.color || "transparent" }}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5">{task.name}</Typography>
        <Checkbox checked={task.isDone} onClick={checkBoxChange} color="secondary" />
      </CardContent>
    </Card>
  ))
}
HomeTaskItem.displayName = "HomeTaskItem"

const useStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {
        display: "grid",
        gridTemplateColumns: "10px 1fr",
      },
      categoryBackground: {
        height: "auto",
        width: "100%",
      },
      content: {
        display: "grid",
        gridTemplateColumns: "1fr 20px",
        alignItems: "center",
      },
    }
  },
  { name: HomeTaskItem.displayName }
)
