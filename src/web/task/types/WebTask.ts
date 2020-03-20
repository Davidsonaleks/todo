/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WebTask
// ====================================================

export interface WebTask_task_category {
  __typename: "Category";
  id: string;
}

export interface WebTask_task {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebTask_task_category | null;
}

export interface WebTask_categories {
  __typename: "Category";
  id: string;
  name: string;
  color: string | null;
}

export interface WebTask {
  task: WebTask_task;
  categories: (WebTask_categories | null)[] | null;
}

export interface WebTaskVariables {
  id: string;
}
