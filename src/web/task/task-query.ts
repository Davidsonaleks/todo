import gql from "graphql-tag"

export const GqlTask = gql`
  query WebTask($id: ID!) {
    task(id: $id) {
      id
      name
      isDone
      category {
        id
      }
    }
    categories {
      id
      name
      color
    }
  }
`

export const GqlTaskCreate = gql`
  mutation WebAddTask($name: String!, $isDone: Boolean!) {
    addNewTask(name: $name, isDone: $isDone) {
      id
      name
      isDone
    }
  }
`

export const GqlTaskUpdate = gql`
  mutation WebUpdateTask($id: ID!, $name: String!, $isDone: Boolean!, $category_id: ID) {
    updateTaskItem(id: $id, name: $name, isDone: $isDone, category_id: $category_id) {
      id
      name
      isDone
      category {
        id
      }
    }
  }
`
