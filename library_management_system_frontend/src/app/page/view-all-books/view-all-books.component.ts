import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit {
  private http;
  public bookList: any = {};
  public selectedBook: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks() {
    this.http.get(`http://localhost:8080/book/get`).subscribe((data) => {
      this.bookList = data;
      console.log(this.bookList);
    });
  }



  deleteBook() {
    let api = "http://localhost:8080/book/" + this.selectedBook.id;
    this.http.delete(api, { responseType: 'text' }).subscribe((response: string) => {
      console.log(response);
      this.loadBooks();
      this.selectedBook = null;
    });
  }

  setSelectedBook(book: any) {
    this.selectedBook = book;
    console.log("setSelectedBook" + book.id);
  }


}
