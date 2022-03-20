import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {State,selectBooksEarningsTotals, selectAllBooks, selectActiveBook} from "src/app/shared/state";
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps
} from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import {BooksPageActions,BooksApiActions} from "../../actions"
import { selectEarningsTotals } from "src/app/shared/state/books.reducer";
@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  // books: BookModel[] = [];
  // currentBook: BookModel | null = null;
  // total: number = 0;
  total$:Observable<number>;
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | undefined>;


  constructor(private booksService: BooksService,private store:Store<State>) {
    this.total$=store.select(selectBooksEarningsTotals);
    this.books$=store.select(selectAllBooks);
    this.currentBook$=store.select(selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter()) 

    this.removeSelectedBook();
  }




  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({bookId:book.id}))
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook())
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({book:bookProps}))
    this.booksService.create(bookProps).subscribe((book) => {
      this.store.dispatch(BooksApiActions.bookCreated({book}))
      this.removeSelectedBook();
    });
  }

  updateBook(book: BookModel) {
  this.store.dispatch(BooksPageActions.updateBook({bookId:book.id,changes:book}))   
    this.booksService.update(book.id, book).subscribe((book) => {
      this.store.dispatch(BooksApiActions.bookUpdated({book}))
      this.removeSelectedBook();
    });
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({bookId:book.id}))
    this.booksService.delete(book.id).subscribe(() => {
      this.store.dispatch(BooksApiActions.bookDeleted({bookId:book.id}))
      this.removeSelectedBook();
    });
  }
}
