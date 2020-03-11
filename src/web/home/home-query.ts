import gql from "graphql-tag"

export const GqlHome = gql`
  query WebHome {
    tasks {
      id
      name
      isDone
    }
    categories {
      id
      name
    }
  }
`

export const GqlTask = gql`
  query WebTask($id: ID!) {
    task(id: $id) {
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

export const GqlHomeCategoryUpdate = gql`
  mutation WebCategoryUpdate($name: String!, $id: ID!) {
    updateCategory(name: $name, id: $id) {
      id
      name
    }
  }
`
