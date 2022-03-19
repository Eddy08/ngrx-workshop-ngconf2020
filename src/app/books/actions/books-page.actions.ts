import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";

//[Books Page] Create Book
// - BookRequiredProps
export const enter = createAction("[Books Page] Enter");

export const selectBook = createAction("[Books Page] Select Book",
props<{bookId: string}>());

export const clearSelectedBook = createAction("[Books Page] Clear Selected Book");

export const createBook = createAction("[Books Page] Create Book",
props<{book:BookRequiredProps}>()
);
//[Books Page] Update Book
// - BookRequiredProps
// - ID
export const updateBook = createAction("[Books Page] Update Book",
props<{changes:BookRequiredProps;bookId: string}>()
)

//[Books Page] Delete Book
// - ID
export const deleteBook = createAction("[Books Page] Delete Book",
props<{bookId: string}>()
)
//[Books Page] Cancel Editing Book
// - ID
// Same as Clear Edit Book
// export const editBook = createAction("[Books Page] Cancel Editing Book")
