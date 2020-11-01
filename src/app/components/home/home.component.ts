import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataModule } from 'src/app/common/data-module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataModule = new DataModule();
  categories = [];
  projectTitle = '';
  projectDescr = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.categories = this.dataModule.getCategories();
    this.projectTitle = this.dataModule.getTitle();
    this.projectDescr = this.dataModule.getDescription();
  }
  loadCategory(category) {
    this.router.navigate(['category'], { queryParams: { category: category } });
  }
}
