import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Router } from '@angular/router';
const moment = _moment; // safe import

const EMPLOYEE_DATA = [
  { id: 1256, name: 'Ronald Richards', status: 'Active', type: 'Experience', teamLeader: 'Philip P.', role: 'UI/UX Designer', productive: 90, joiningDate: new Date('2024-03-20'), salary: 4256, workType: 'WFO' },
  { id: 1258, name: 'Theresa Webb', status: 'Inactive', type: 'Fresher', teamLeader: 'Colleen S.', role: 'Developer', productive: 64, joiningDate: new Date('2015-03-20'), salary: 1458, workType: 'WFH' },
];

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class EmployeeManagementComponent {

  displayedColumns: string[] = [
     'id', 'name', 'role', 'type', 'teamLeader', 
    'productive', 'joiningDate', 'salary', 'workType', 'status', 'view'
  ];
  dataSource = new MatTableDataSource<any>(EMPLOYEE_DATA);

  searchText: string = '';
selectedRole: string = '';
selectedDate: Date | null = null;
roles: string[] = ['Admin', 'Employee', 'HR', 'Manager'];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applySearch(searchTerm: string) {
    console.log('Searching for:', searchTerm);
    // Your actual filter/search logic here
  }
  

  filterStatus(status: string) {
    // you can customize filter here
  }

  filterType(type: string) {
    // you can customize filter here
  }

  filterDate(date: any) {
    // you can customize filter here
  }

  addEmployee() {
    this.router.navigateByUrl('/add-employee');
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText = value;
    this.applyFilters();
  }
  
  filterByRole() {
    this.applyFilters();
  }
  
  filterByDate() {
    this.applyFilters();
    console.log(this.selectedDate);
  }
  
  clearFilters() {
    this.searchText = '';
    this.selectedRole = '';
    this.selectedDate = null;
    this.applyFilters();
  }
  
  applyFilters() {
    // Logic to apply searchText, selectedRole, selectedDate
  }
  
}
