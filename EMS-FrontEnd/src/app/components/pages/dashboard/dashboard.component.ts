import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api/api.service';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../../shared/services/common/common.service';
import { CheckInsComponent } from '../attendence/check-ins/check-ins.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  hasCheckedIn: any
  
 constructor(
     private router: Router,
     private dialog: MatDialog,
     private activateRoute: ActivatedRoute,
     private apiService: ApiService,
     private fb: FormBuilder,
     private commonService: CommonService
   ) {}

  ngOnInit(): void {
    this.openCheckIns();
  }

  openCheckIns() {
      // debugger
      if (typeof window !== 'undefined') {
      this.hasCheckedIn = sessionStorage.getItem('checkedIn');
      }

      

      if (!this.hasCheckedIn) {
        const dialogRef = this.dialog.open(CheckInsComponent, {
          width: '600px',
          disableClose: true,
          data: {}
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== 'saved') {
            // this.commonService.openSnackbar('Check-in required to continue', 'error');
            
          }
        });
      }
    }

}
