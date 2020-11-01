import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BookService } from 'src/app/common/book.service';
import { fromEvent } from 'rxjs';
import { sampleTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CategoryComponent implements OnInit, AfterViewInit {
  books: any = [];
  activeInput: boolean = false;
  pageCount: number = 1;
  loading: boolean = true;
  title: String = '';
  category = '';
  searchValue: String = '';
  bookSearch: boolean = false;
  hideKeyword: boolean = true;
  constructor(
    private service: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.books = [];
    this.loading = true;
    this.title = '';
    this.bookSearch = false;
    this.category = this.route.snapshot.queryParams['category'].toLowerCase();
    this.title = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    this.loadBooks(this.pageCount);
  }
  loadBooks(pageCount) {
    if (this.bookSearch) return;
    this.service.getAllBooks(pageCount, this.category).subscribe(
      (res) => {
        this.setBooksData(res, false);
        this.loading = false;
      },
      (err) => {
        console.log('No more data to show');
      }
    );
  }
  setBooksData(res, isNew) {
    if (isNew) {
      this.books = res.results;
    } else {
      this.books = [...this.books, ...res.results];
    }
  }
  ngAfterViewInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      sampleTime(300), // to prevent getting multiple values in a milisecond
      map(() => document.documentElement.scrollTop)
    );
    scroll$.subscribe((scrollPos) => {
      const percent = (document.body.scrollHeight / 100) * 70;
      if (percent <= scrollPos) {
        this.loadBooks(++this.pageCount);
      }
    });
  }
  backToHome() {
    this.router.navigate(['home']);
  }
  searchByKeyword() {
    const keyword = this.searchValue;
    this.loading = true;
    this.bookSearch = true;
    this.hideKeyword = false;
    if (keyword.trim().length == 0) {
      this.bookSearch = false;
      this.hideKeyword = true;
    }
    this.service
      .getBooksBySearchKeyword(encodeURIComponent(this.category), keyword)
      .subscribe(
        (res) => {
          this.setBooksData(res, true);
          this.loading = false;
        },
        (err) => {
          console.log('No more data to show');
        }
      );
  }

  loadBook(book) {
    let url;
    if (book.formats['text/html; charset=utf-8']) {
      url = book.formats['text/html; charset=utf-8'];
    } else if (book.formats['application/pdf']) {
      url = book.formats['application/pdf'];
    } else if (book.formats['text/plain; charset=utf-8']) {
      url = book.formats['text/plain; charset=utf-8'];
    }
    if (url && url.length > 0 && !url.includes('.zip'))
      window.open(url, '_blank');
    else alert('No viewable version available');
  }
  clearSearch() {
    this.searchValue = '';
    this.hideKeyword = true;
    this.pageCount = 1;
    this.bookSearch = false;
    this.books = [];
    this.loading = true;
    this.loadBooks(this.pageCount);
  }

  onInputFocus() {    
    this.activeInput = true;
  }
  onInputBlur() {    
    this.activeInput = false;
  }
}
