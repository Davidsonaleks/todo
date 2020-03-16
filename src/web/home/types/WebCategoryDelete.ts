/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebCategoryDelete
// ====================================================

export interface WebCategoryDelete_deleteCategory {
  __typename: "Category";
  id: string;
  name: string;
  color: string | null;
}

export interface WebCategoryDelete {
  deleteCategory: (WebCategoryDelete_deleteCategory | null)[] | null;
}

export interface WebCategoryDeleteVariables {
  id: string;
}
