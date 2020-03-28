/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebHomeUpdateTask
// ====================================================

export interface WebHomeUpdateTask_updateTask_category {
  __typename: "Category";
  id: string;
}

export interface WebHomeUpdateTask_updateTask {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebHomeUpdateTask_updateTask_category | null;
}

export interface WebHomeUpdateTask {
  updateTask: (WebHomeUpdateTask_updateTask | null)[] | null;
}

export interface WebHomeUpdateTaskVariables {
  id: string;
  isDone: boolean;
}
