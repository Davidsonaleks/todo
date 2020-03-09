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
  query WebHome {
    addNewTask {
      id
      name
      isDone
    }
  }
`
