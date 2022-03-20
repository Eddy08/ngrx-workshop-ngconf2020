import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
    books:fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
    books:fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

// Books store

export const selectBooksState= (state:State) => state.books;
// export const selectActiveBook_unoptmized = (state:State) => {
//     const booksState = selectBooksState(state);
//     return fromBooks.selectActiveBook(booksState);
// }
export const selectActiveBook=createSelector(
    selectBooksState,
    (booksState) => fromBooks.selectActiveBook
)

export const selectAllBooks = createSelector(
    selectBooksState,
    fromBooks.selectAll
)
export const selectBooksEarningsTotals = createSelector(
    selectBooksState,
    fromBooks.selectEarningsTotals
  );