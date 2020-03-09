/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebAddTask
// ====================================================

export interface WebAddTask_addNewTask {
  __typename: "Task";
  id: string | null;
  name: string | null;
  isDone: boolean | null;
}

export interface WebAddTask {
  addNewTask: WebAddTask_addNewTask | null;
}
