/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WebHome
// ====================================================

export interface WebHome_tasks_category {
  __typename: "Category";
  id: string;
}

export interface WebHome_tasks {
  __typename: "Task";
  id: string;
  name: string;
  isDone: boolean;
  category: WebHome_tasks_category | null;
}

export interface WebHome_categories {
  __typename: "Category";
  id: string;
  name: string;
  color: string | null;
}

export interface WebHome {
  tasks: WebHome_tasks[];
  categories: (WebHome_categories | null)[] | null;
}
