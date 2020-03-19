import { makeStyles } from "@material-ui/core"
import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { useApollo } from "../../di"
import { TLoadData } from "../../types"
import { PageInner } from "../el/page-inner"
import { TTheme } from "../theme"
import { TaskFields } from "./task-fields"
import { GqlTask, GqlTaskUpdate } from "./task-query"
import { WebTask, WebTaskVariables, WebTask_task } from "./types/WebTask"
import { WebUpdateTask, WebUpdateTaskVariables } from "./types/WebUpdateTask"

type TTaskData = { data: WebTask }
export const taskLoader: TLoadData<TTaskData | null> = async (
  { match },
  { apollo, userInterface }
) => {
  const r: ApolloQueryResult<WebTask> = await apollo.query<WebTask, WebTaskVariables>({
    query: GqlTask,
    variables: {
      id: match.params.id,
    },
  })
  userInterface.setHeaderTitle(r.data.task?.name || "Task")
  return { data: r.data }
}

type TTaskRootProps = TRouteComponentProps<TTaskData>

export const TaskRoot: FC<TTaskRootProps> = ({ data }) => {
  const classes = useStyles()
  const apollo = useApollo()
  // const history = useHistory()
  const on_submit = async (values: WebTask_task | null) => {
    const r = await apollo.mutate<WebUpdateTask, WebUpdateTaskVariables>({
      mutation: GqlTaskUpdate,
      variables: {
        id: data.task!.id,
        name: values!.name,
        isDone: values!.isDone,
        category_id: values && values.category ? values.category.id : null,
      },
    })
    if (!r.data) {
      throw "No data"
    }
    // history.replace("/task/" + r.data.updateTaskItem!.id)
  }
  return (
    <PageInner className={classes.root}>
      <Form
        onSubmit={on_submit}
        initialValues={data.task}
        render={props => {
          return <TaskFields {...props} data={data} />
        }}
      />
    </PageInner>
  )
}
TaskRoot.displayName = "TaskRoot"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        marginTop: theme.spacing(2),
      },
    }
  },
  { name: TaskRoot.displayName }
)
