import { Injectable } from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books.slice());
  }
}
