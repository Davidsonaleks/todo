/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WebHome
// ====================================================

export interface WebHome_tasks {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
}

export interface WebHome {
  tasks: (WebHome_tasks | null)[] | null;
}
