import {
  Card,
  CardContent,
  Checkbox,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import clsx from "clsx"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useApollo, useUI } from "../../../di"
import { RouterLink } from "../../el/link"
import { TTheme } from "../../theme"
import { useHomeContext } from "../home-ctx"
import { GqlHomesDeleteTask, GqlHomesUpdateTask } from "../home-query"
import { WebHome_tasks } from "../types/WebHome"
import {
  WebHomeDeleteTask,
  WebHomeDeleteTaskVariables,
  WebHomeDeleteTask_removeTask,
} from "../types/WebHomeDeleteTask"
import {
  WebHomeUpdateTask,
  WebHomeUpdateTaskVariables,
  WebHomeUpdateTask_updateTask,
} from "../types/WebHomeUpdateTask"

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
      const r = await apollo.mutate<WebHomeUpdateTask, WebHomeUpdateTaskVariables>({
        mutation: GqlHomesUpdateTask,
        variables: {
          id: task.id,
          isDone: !task.isDone,
        },
      })
      if (r.data && r.data.updateTask) {
        const tasks = r.data.updateTask.filter(
          item => item && item
        ) as WebHomeUpdateTask_updateTask[]
        tasks_model.setTasks(tasks)
      }
      ui.setLocker(false)
    } catch (e) {
      console.error(e)
      ui.setLocker(false)
    }
  }

  const deleteTask = async () => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebHomeDeleteTask, WebHomeDeleteTaskVariables>({
        mutation: GqlHomesDeleteTask,
        variables: {
          id: task.id,
        },
      })
      if (r.data && r.data.removeTask) {
        const tasks = r.data.removeTask.filter(
          item => item && item
        ) as WebHomeDeleteTask_removeTask[]
        tasks_model.setTasks(tasks)
      }
      ui.setLocker(false)
    } catch (e) {
      console.error(e)
      ui.setLocker(false)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return useObserver(() => (
    <Card className={classes.root}>
      <div
        className={classes.categoryBackground}
        style={{ background: category?.color || "transparent" }}
      />
      <CardContent className={clsx(classes.content)}>
        <Typography variant="h5" className={clsx(task.isDone && classes.decoration)}>
          {task.name}
        </Typography>
        <Checkbox
          checked={task.isDone}
          onClick={checkBoxChange}
          style={category && category.color ? { color: category.color } : {}}
          className={clsx(classes.checkbox, !category && classes.checkboxDefaultColor)}
        />
        <MoreVertIcon
          style={category && category.color ? { color: category.color } : {}}
          className={classes.checkbox}
          onClick={e => handleClick(e as any)}
        />
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem>
            <RouterLink to={"/task/" + task.id}>Edit</RouterLink>
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteTask()
              handleClose()
            }}
          >
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  ))
}
HomeTaskItem.displayName = "HomeTaskItem"

const useStyles = makeStyles<TTheme>(
  theme => {
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
        gridTemplateColumns: "1fr 20px 25px",
        alignItems: "center",
      },
      decoration: {
        textDecoration: "line-through",
      },
      checkbox: {
        justifySelf: "flex-end",
      },
      checkboxDefaultColor: {
        color: theme.custom.colors.whiteBlack + " !important",
      },
    }
  },
  { name: HomeTaskItem.displayName }
)
