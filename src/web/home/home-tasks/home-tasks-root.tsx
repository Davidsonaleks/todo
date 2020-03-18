import { Grid, makeStyles } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { TTheme } from "../../theme"
import { useHomeContext } from "../home-ctx"
import { HomeTaskItem } from "./home-tasks-item"

export const HomeTasks: FC = () => {
  const classes = useStyles()
  const { tasks_model } = useHomeContext()
  return useObserver(() => (
    <div className={classes.root}>
      <Grid container>
        {tasks_model.tasks.map(task => (
          <Grid item key={task.id} xs={12} sm={6} md={3}>
            <HomeTaskItem task={task} />
          </Grid>
        ))}
      </Grid>
    </div>
  ))
}
HomeTasks.displayName = "HomeTasks"

const useStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {},
    }
  },
  { name: HomeTasks.displayName }
)
