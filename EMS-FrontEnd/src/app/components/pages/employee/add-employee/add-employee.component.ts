import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-add-employee',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;

  roles: Array<any> = [];
  statuses: Array<any> = [];
  selectedRole: string = '';
  typeList: Array<any> = [];
  designationList: Array<any> = [];
  workTypeList: Array<any> = [];

  url: string | ArrayBuffer = '';
  previewUrl: string | ArrayBuffer | null = null;  // Store the image URL or base64 data

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any

  ) {

  }

  ngOnInit(): void {
    this.prepareAddEmployeeForm();
    // console.log(this.data);

    this.roles = this.data.Roles || []
    
    this.statuses = this.data.Status.filter((role:any) => role.value !== 'All') || []

    this.typeList = this.typeList.concat(
      {value: "Fresher", label: "Fresher"},
      {value: "Experience", label: "Experience"}
    );

    this.designationList = this.designationList.concat(
      {value: "1", label: "UX/UI Designer"},
      {value: "2", label: "Finance Analyst"},
      {value: "3", label: "Systems Analyst"},
      {value: "4", label: "Product Manager"},
      {value: "5", label: "Data Scientist"},
      {value: "6", label: "Technical Support"},
      {value: "7", label: "Marketing"},
      {value: "8", label: "Marketing"},
      {value: "9", label: "Front End Developer"},
      {value: "10", label: "Back End Developer"},
      {value: "11", label: "Full Stack Developer"},
      {value: "12", label: "Dev Ops Engineer"},
      {value: "13", label: "Tester"},
    );

    this.workTypeList = this.workTypeList.concat(
      {value: "1", label: "WFO"},
      {value: "2", label: "WFH"},
    )
    
  }

  prepareAddEmployeeForm() {
    this.employeeForm = this.fb.group({
      profileImage: [''],
      name: ['', Validators.required],
      status: ['Active', Validators.required],
      type: [''],
      teamLeader: [''],
      role: [''],
      designation: [''],
      joiningDate: [''],
      salary: [0],
      workType: [''],
    });
  }

  filterStatus(status: string) {
    // you can customize filter here
  }

  filterByRole() {
  }

  filterByType() {

  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;

      // Now save newEmployee into backend (API call) or local array if dummy
      // After saving, redirect back to employees page

      console.log('New employee data:', newEmployee);

      this.router.navigate(['/employees-management']); // Redirect back to Manage Employees
    }
  }

  onSelectFile(event: Event) {
    debugger
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;

      // Assign base64 or file based on your need
      this.employeeForm.patchValue({
        profileImage: reader.result // or use 'file' if you want the raw file
      });

      // These must be inside the onload to ensure the file is read
      console.log('Form Value:', this.employeeForm.getRawValue());
      console.log('Preview URL:', this.previewUrl);
    };
      reader.readAsDataURL(file);
    }
    
    console.log('Form Value:', this.employeeForm.getRawValue());
    
  }


  cancel() {
    this.dialogRef.close();
  }
}
