import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";

//[Book Page] Create a Book
// - BookRequiredProps
const createBook = createAction("[Book Page] Create a Book",
props<{book:BookRequiredProps}>()
);
//[Book Page] Update a Book
// - BookRequiredProps
// - ID
const updateBook = createAction("[Book Page] Update a Book",
props<{book:BookRequiredProps,ID:string}>()
)

//[Book Page] Delete a Book
// - ID
const deleteBook = createAction("[Book Page] Delete a Book",
props<{ID:string}>()
)
//[Book Page] Cancel Editing a Book
// - ID
const editBook = createAction("[Book Page] Cancel Editing a Book")