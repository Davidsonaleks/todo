/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebCategoryUpdate
// ====================================================

export interface WebCategoryUpdate_updateCategory {
  __typename: "Category";
  id: string;
  name: string;
  color: string | null;
}

export interface WebCategoryUpdate {
  updateCategory: (WebCategoryUpdate_updateCategory | null)[] | null;
}

export interface WebCategoryUpdateVariables {
  name: string;
  id: string;
}
