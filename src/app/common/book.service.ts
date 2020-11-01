import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  getAllBooks(pageCount, category) {
    return this.http.get(
      environment.endpoint.base + pageCount + '&topic=' + category
    );
  }
  getBooksBySearchKeyword(category, searchKeyword) {
    return this.http.get(
      environment.endpoint.searchByKeyword +
        searchKeyword +
        '&topic=' +
        category
    );
  }
}
