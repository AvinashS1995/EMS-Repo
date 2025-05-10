import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SharedModule } from '../../../../shared/shared.module';

const ATTENDANCE_DATA: AttendanceRecord[] = [
  { date: '13/01', name: 'Aisha Doe', role: 'UX/UI Designer', employmentType: 'Full-Time', status: 'Present', checkIn: '09:00 AM', checkOut: '05:00 PM', photo: 'assets/images/avatar1.png' },
  { date: '13/01', name: 'Santhosh', role: 'Finance Analyst', employmentType: 'Part-Time', status: 'Absent', checkIn: '', checkOut: '', photo: 'assets/images/avatar2.png' },
  { date: '13/01', name: 'Jagadish', role: 'Systems Analyst', employmentType: 'Full-Time', status: 'Present', checkIn: '08:50 AM', checkOut: '05:20 PM', photo: 'assets/images/avatar3.png' },
  { date: '13/01', name: 'Karthick', role: 'Product Manager', employmentType: 'Full-Time', status: 'Present', checkIn: '08:45 AM', checkOut: '06:20 PM', photo: 'assets/images/avatar4.png' },
  { date: '13/01', name: 'Arav', role: 'Data Scientist', employmentType: 'Full-Time', status: 'Late', checkIn: '11:00 AM', checkOut: '05:00 PM', photo: 'assets/images/avatar5.png' },
  { date: '13/01', name: 'Kavitha', role: 'Technical Support', employmentType: 'Full-Time', status: 'Present', checkIn: '08:55 AM', checkOut: '05:30 PM', photo: 'assets/images/avatar6.png' },
  { date: '13/01', name: 'Vijaykumar', role: 'Marketing', employmentType: 'Part-Time', status: 'Absent', checkIn: '', checkOut: '', photo: 'assets/images/avatar7.png' },
  { date: '13/01', name: 'Angel', role: 'Web Developer', employmentType: 'Full-Time', status: 'Present', checkIn: '09:10 AM', checkOut: '08:00 PM', photo: 'assets/images/avatar8.png' }
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


export interface AttendanceRecord {
  date: string;
  name: string;
  role: string;
  employmentType: string;
  status: string;
  checkIn: string;
  checkOut: string;
  photo: string;
}

@Component({
  selector: 'app-attendence-management',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './attendence-management.component.html',
  styleUrl: './attendence-management.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class AttendenceManagementComponent {


  displayedColumns: string[] = ['date', 'employee', 'role', 'employmentType', 'status', 'checkIn', 'checkOut'];
  dataSource = new MatTableDataSource<AttendanceRecord>(ATTENDANCE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
