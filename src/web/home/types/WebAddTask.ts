/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebAddTask
// ====================================================

export interface WebAddTask_addNewTask {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
}

export interface WebAddTask {
  addNewTask: (WebAddTask_addNewTask | null)[] | null;
}

export interface WebAddTaskVariables {
  name: string;
  isDone: boolean;
}
