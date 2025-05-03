import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { ActivatedRoute, Data, Router } from '@angular/router';
const moment = _moment;
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { takeUntil } from 'rxjs';
import { ApiService } from '../../../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { HttpClient } from '@angular/common/http';

const EMPLOYEE_DATA = [
  {
    id: 1256,
    name: 'Ronald Richards',
    status: 'Active',
    type: 'Experience',
    teamLeader: 'Philip P.',
    role: 'UI/UX Designer',
    productive: 90,
    joiningDate: new Date('2024-03-20'),
    salary: 4256,
    workType: 'WFO',
  },
  {
    id: 1258,
    name: 'Theresa Webb',
    status: 'Inactive',
    type: 'Fresher',
    teamLeader: 'Colleen S.',
    role: 'Developer',
    productive: 64,
    joiningDate: new Date('2015-03-20'),
    salary: 1458,
    workType: 'WFH',
  },
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class EmployeeManagementComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'type',
    'teamLeader',
    'joiningDate',
    'salary',
    'workType',
    'status',
    'view',
  ];
  dataSource = new MatTableDataSource<any>(EMPLOYEE_DATA);

  searchText: string = '';
  selectedRole: string = '';
  selectedDate: Date | null = null;
  roles: Array<any> = [];
  statuses: Array<any> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getparam();
    // this.getEmployees();
  }

  getparam() {
    this.activateRoute.data.subscribe((params) => {
      console.log('Title ---->', params);

      this.roles = params['data'].roles?.data?.types || [];
      this.roles = this.roles.map((item) => {
        return {
          value: item.typeValue,
          label: item.typeLabel,
        };
      });

      console.log('Roles--->', this.roles);

      this.statuses = params['data'].status?.data?.types || [];
    this.statuses = this.statuses.map((status) => {
      return {
        value: status.typeValue,
        label: status.typeLabel,
      };
    });

    console.log("Status ---->", this.statuses)
    });

    
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
    this.getEmployees();
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '600px',
      disableClose: true,
      data: {
        Roles: this.roles,
        Status: this.statuses
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.getEmployees();
      }
    });
  }

  getEmployees() {
    
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
