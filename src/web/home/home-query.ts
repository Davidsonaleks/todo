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
  mutation WebAddTask($name: String!, $isDone: Boolean!) {
    addNewTask(name: $name, isDone: $isDone) {
      id
      name
      isDone
    }
  }
`
