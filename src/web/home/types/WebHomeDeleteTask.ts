/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebHomeDeleteTask
// ====================================================

export interface WebHomeDeleteTask_removeTask_category {
  __typename: "Category";
  id: string;
}

export interface WebHomeDeleteTask_removeTask {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebHomeDeleteTask_removeTask_category | null;
}

export interface WebHomeDeleteTask {
  removeTask: WebHomeDeleteTask_removeTask[];
}

export interface WebHomeDeleteTaskVariables {
  id: string;
}
