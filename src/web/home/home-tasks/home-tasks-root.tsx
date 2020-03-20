import { Fab, Grid, makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import { TTheme } from "../../theme"
import { useHomeContext } from "../home-ctx"
import { HomeTaskItem } from "./home-tasks-item"

export const HomeTasks: FC = () => {
  const classes = useStyles()
  const { tasks_model } = useHomeContext()
  return useObserver(() => (
    <div>
      <Typography variant="h2" color="primary" className={classes.title}>
        Tasks
      </Typography>
      <Grid container>
        {tasks_model.tasks.map(task => (
          <Grid item key={task.id} xs={12} sm={6} md={3}>
            <HomeTaskItem task={task} />
          </Grid>
        ))}
      </Grid>
      <Link to="/task/create">
        <Fab color="primary" size="large" className={classes.addButton}>
          <AddIcon className={classes.addIcon} />
        </Fab>
      </Link>
    </div>
  ))
}
HomeTasks.displayName = "HomeTasks"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      title: {
        margin: `${theme.spacing(2)}px 0`,
      },
      addButton: {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        [theme.breakpoints.up("sm")]: {
          bottom: "100px",
          right: "100px",
        },
      },
      addIcon: {
        width: "30px",
        height: "30px",
      },
    }
  },
  { name: HomeTasks.displayName }
)
