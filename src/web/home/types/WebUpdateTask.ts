/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebUpdateTask
// ====================================================

export interface WebUpdateTask_updateTask_category {
  __typename: "Category";
  id: string;
}

export interface WebUpdateTask_updateTask {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebUpdateTask_updateTask_category | null;
}

export interface WebUpdateTask {
  updateTask: (WebUpdateTask_updateTask | null)[] | null;
}

export interface WebUpdateTaskVariables {
  id: string;
  name: string;
  isDone: boolean;
}
