/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WebTask
// ====================================================

export interface WebTask_task {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
}

export interface WebTask {
  task: WebTask_task | null;
}

export interface WebTaskVariables {
  id: string;
}
