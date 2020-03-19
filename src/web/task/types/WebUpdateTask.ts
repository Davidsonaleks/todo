/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebUpdateTask
// ====================================================

export interface WebUpdateTask_updateTaskItem_category {
  __typename: "Category";
  id: string;
}

export interface WebUpdateTask_updateTaskItem {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebUpdateTask_updateTaskItem_category | null;
}

export interface WebUpdateTask {
  updateTaskItem: WebUpdateTask_updateTaskItem | null;
}

export interface WebUpdateTaskVariables {
  id: string;
  name: string;
  isDone: boolean;
  category_id?: string | null;
}
