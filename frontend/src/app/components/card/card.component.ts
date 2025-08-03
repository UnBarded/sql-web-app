import { Component } from '@angular/core';
import { QueryService } from '../../query.server';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Customer {
  CustomerID: number;
  FirstName: string;
  LastName: string;
  Address: string;
  PhoneNum: number;
  Email: string;
  CreditCard: number;
  CreditType: string;
  ValidityCard: any;
  devices_owned: number;
  last_service_request: any;
  number_of_successful_repairs: number;
  seniority_in_years: number;
  worker_type: string;
  total_cost: number;
  total_item_cost: number;
  total_logistic_and_repair_cost: number;
  ItemID: number;
  Description: number;
  UnitPrice: number;
  latest_consumed: any;
  total_amount_consumed: number;
  number_of_devices_fixed: number;
  DateOfRequest: any;
  RequestID: number;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, MatTableModule, MatGridListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  query = 'select * from tblCustomer';
  results: Customer[] = [];
  error = '';
  title: any;
  type: number = -1;
  customerId: number = 0;
  request: number = 0;
  amount: number = 0;
  displayedColumns: string[] = ['CustomerID', 'firstname', 'lastname', 'email', 'address', 'credit_type', 'credit_card', 'validity_card', 'select'];

  constructor(private queryService: QueryService) { }

  run(query: string, type: number) {
    this.queryService.runQuery(query).subscribe({
      next: data => {
        this.type = type;
        this.results = data;
        console.log(this.results)
        this.error = '';
        switch (type) {
          case 0: {
            this.displayedColumns = ['CustomerID', 'firstname', 'lastname', 'email', 'address', 'credit_type', 'credit_card', 'validity_card', 'select'];
            break;
          }
          case 1: {
            this.displayedColumns = ['CustomerID', 'DeviceID', 'DeviceType', 'Model', 'Producer', 'PurchaseDate'];
            break;
          }
          case 2: {
            this.displayedColumns = ['CustomerID', 'firstname', 'lastname', 'devices_owned', 'last_service_request'];
            break;
          }
          default: {
            break;
          }
        }


      },
      error: err => {
        this.error = err.error.error || 'Query failed';
        this.results = [];
      }
    });
  }

  run_query_1() {
    this.queryService.runQuery('SELECT * FROM types_of_technicians').subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 3
        this.displayedColumns = ['TechnicianID', 'FirstName', 'LastName', 'number_of_successful_repairs', 'seniority_in_years', 'worker_type'];
      }
    })
  }

  run_query_2() {
    this.queryService.runQuery('SELECT * FROM view_total_customer_costs').subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 4
        this.displayedColumns = ['CustomerID', 'FirstName', 'LastName', 'total_cost', 'total_item_cost', 'total_logistic_and_repair_cost'];
      }
    })
  }

  run_query_3() {
    this.queryService.runQuery('SELECT * FROM items_not_in_the_last_half_a_year').subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 5
        this.displayedColumns = ['ItemID', 'Description', 'UnitPrice', 'total_amount_consumed', 'latest_consumed'];
      }
    })
  }

  run_query_4() {
    this.queryService.runQuery(`select a.RequestID, a.CustomerID, b.FirstName, b.LastName, a.DateOfRequest
      from tblServiceRequest a
      inner join tblCustomer b on b.CustomerID = a.CustomerID
      where a.CustomerID = ${this.customerId}`).subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 6
        this.displayedColumns = ['CustomerID', 'RequestID', 'FirstName', 'LastName', 'DateOfRequest'];
      }
    })
  }

  run_query_5() {
    this.queryService.runQuery(`exec SelectRequestsForTommorrow @FaultType = ${this.request}`).subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 7
        this.displayedColumns = ['CustomerID', 'FirstName', 'LastName', 'devices_owned', 'last_service_request'];
      }
    })
  }

  run_query_6() {
    this.queryService.runQuery(`SELECT * FROM number_of_devices_fixed_of_technicians_that_recieved_expertise_in_the_last_year`).subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 8
        this.displayedColumns = ['TechnicianID', 'number_of_devices_fixed_of_technicians_that_recieved_expertise_in_the_last_year'];
      }
    })
  }

  run_query_7() {
    this.queryService.runQuery(`exec select_all_technicians_that_fixed_at_least_amount_in_their_expertise @amount = ${this.amount}`).subscribe({
      next: data => {
        this.results = data
        console.log(this.results)
        this.type = 9
        this.displayedColumns = ['TechnicianID', 'FirstName', 'LastName', 'number_of_devices_fixed'];
      }
    })
  }
}