/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebCategoryCreate
// ====================================================

export interface WebCategoryCreate_addCategory {
  __typename: "Category";
  id: string;
  name: string;
}

export interface WebCategoryCreate {
  addCategory: (WebCategoryCreate_addCategory | null)[] | null;
}

export interface WebCategoryCreateVariables {
  name: string;
}
