// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend';
// }

import { Component } from '@angular/core';
import { QueryService } from './query.server';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, CardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  query = 'select * from tblCustomer';
  results: any[] = [];
  error = '';
  title: any;

  constructor(private queryService: QueryService) {}

  run() {
    this.queryService.runQuery(this.query).subscribe({
      next: data => {
        this.results = data;
        this.error = '';
      },
      error: err => {
        this.error = err.error.error || 'Query failed';
        this.results = [];
      }
    });
  }
}
