export class DataModule {
  private categories: string[] = [
    'FICTION',
    'DRAMA',
    'HUMOUR',
    'PHILOSOPHY',
    'HISTORY',
    'ADVENTURE',
    'POLITICS',
  ];
  private projectTitle = 'Gutenberge Project';
  private projectDescr =
    'A social cataloging website that allows you to freely search its database of books, annotations, and reviews.';

  getCategories() {
    return this.categories;
  }
  getTitle() {
    return this.projectTitle;
  }

  getDescription() {
    return this.projectDescr;
  }
}
