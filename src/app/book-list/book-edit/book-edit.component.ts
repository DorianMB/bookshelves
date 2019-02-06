import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../models/Book.model';
import * as firebase from '../../services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookEdit: FormGroup;
  fileIsUploading = false;
  fileUploaded = false;
  fileUrl: string;
  book: Book;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params.id;
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
        this.fileUrl = this.book.photo;
      }
    );
    this.initForm();
  }

  initForm() {
    this.bookEdit = this.formBuilder.group({
      title: this.book.title,
      author: this.book.author,
      description: this.book.description ? this.book.description : ''
    });
  }

  onSaveBook() {
    const title = this.bookEdit.get('title').value ? this.bookEdit.get('title').value : this.book.title;
    const author = this.bookEdit.get('author').value ? this.bookEdit.get('author').value : this.book.author;
    let description: string;
    if (this.bookEdit.get('description').value
      && this.bookEdit.get('description').value !== ''
      && this.bookEdit.get('description').value !== ' ') {
      description = this.bookEdit.get('description').value;
    } else {
      description = this.book.description;
    }
    const newBook = new Book(title, author);
    newBook.description = description;
    newBook.photo = this.fileUrl;
    console.log('url new : ' + newBook.photo);
    this.booksService.removeEditBook(this.book);
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        console.log('url up : ' + this.fileUrl);
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.booksService.removePhoto(this.book.photo);
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
