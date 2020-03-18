import gql from "graphql-tag"

export const GqlHome = gql`
  query WebHome {
    tasks {
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

export const GqlHomeUpdateTask = gql`
  mutation WebUpdateTask($id: ID!, $name: String!, $isDone: Boolean!) {
    updateTask(id: $id, name: $name, isDone: $isDone) {
      id
      name
      isDone
      category {
        id
      }
    }
  }
`

export const GqlHomeCategoryUpdate = gql`
  mutation WebCategoryUpdate($name: String!, $id: ID!, $color: String) {
    updateCategory(name: $name, id: $id, color: $color) {
      id
      name
      color
    }
  }
`

export const GqlHomeCategoryCreate = gql`
  mutation WebCategoryCreate($name: String!, $color: String) {
    addCategory(name: $name, color: $color) {
      id
      name
      color
    }
  }
`
export const GqlHomeCategoryDelete = gql`
  mutation WebCategoryDelete($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      color
    }
  }
`
