import * as radweb from 'radweb';
import { environment } from './../environments/environment';

export class Categories extends radweb.Entity<number> {
  id = new radweb.NumberColumn({ dbName: 'CategoryID' });
  categoryName = new radweb.StringColumn();
  description = new radweb.StringColumn();
  categoryNameLength = new radweb.NumberColumn({
    virtualData: () => this.categoryName.value.length
  });
  categoryNameLengthAsync = new radweb.NumberColumn({
    virtualData: () => Promise.resolve(this.categoryName.value.length)
  });
  constructor() {
    super(() => new Categories(), environment.dataSource, 'Categories');
    this.initColumns();
  }
}