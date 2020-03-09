import gql from "graphql-tag"

export const GqlHome = gql`
  query WebHome {
    tasks {
      id
      name
      isDone
    }
  }
`

export const GqlHomeCreate = gql`
  mutation WebAddTask {
    addNewTask {
      id
      name
      isDone
    }
  }
`
