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

export const GqlHomesUpdateTask = gql`
  mutation WebHomeUpdateTask($id: ID!, $isDone: Boolean!) {
    updateTask(id: $id, isDone: $isDone) {
      id
      name
      isDone
      category {
        id
      }
    }
  }
`

export const GqlHomesDeleteTask = gql`
  mutation WebHomeDeleteTask($id: ID!) {
    removeTask(id: $id) {
      id
      name
      isDone
      category {
        id
      }
    }
  }
`
