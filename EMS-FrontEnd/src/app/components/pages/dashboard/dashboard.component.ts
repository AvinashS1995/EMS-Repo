import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api/api.service';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../../shared/services/common/common.service';
import { CheckInsComponent } from '../attendence/check-ins/check-ins.component';
import { SharedModule } from '../../../shared/shared.module';
import { animate, keyframes, style, transition, trigger, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
          trigger('scrollUp', [
            transition('* => *', [
              animate(
                '15s linear',
                keyframes([
                  style({ transform: 'translateY(0%)', opacity: 1, offset: 0 }),
                  style({ transform: 'translateY(-100%)', opacity: 0.5, offset: 1 }),
                  
                ])
              ),
            ]),
          ]),
        ],
})
export class DashboardComponent {

  hasCheckedIn: any
  animationState = false;
  pauseAnimation = false;
  upcomingHolidays: Array<any> = [];
  
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
    this.getparams();
  }

  openCheckIns() {
      // debugger
      if (typeof window !== 'undefined') {
      this.hasCheckedIn = sessionStorage.getItem('checkIns');
      }

      

      if (!this.hasCheckedIn) {
        const dialogRef = this.dialog.open(CheckInsComponent, {
          width: '600px',
          disableClose: true,
          data: { mode: 'checkins' }
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'checkins') {
            // this.commonService.openSnackbar('Check-in required to continue', 'error');
            
          }
        });
      }
    }

    onAnimationDone(event: AnimationEvent) {
      // Flip the state to restart the animation
      this.animationState = !this.animationState;
    }

    getparams() {
      this.activateRoute.data.subscribe((params) => {
        // console.log('Params Leave Management ---->', params);
  
        if (params['data']) {
  
          this.upcomingHolidays =
            params['data'].getUpcomingHoliday?.data?.upComingHolidays || [];
  
  
            this.upcomingHolidays = this.getCurrentAndNextMonthHolidays(this.upcomingHolidays);
  
          // console.log('Upcoming Holidays--->', this.upcomingHolidays);
        }
      });
    }

    getCurrentAndNextMonthHolidays(holidays: any[]): any[] {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
    
      const nextMonth = (currentMonth + 1) % 12;
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
      return holidays
        .map(holiday => {
          const dateObj = new Date(holiday.date);
          return {
            ...holiday,
            dateObj,
            name: this.cleanName(holiday.name)
          };
        })
        .filter(holiday => {
          const m = holiday.dateObj.getMonth();
          const y = holiday.dateObj.getFullYear();
          return (m === currentMonth && y === currentYear) || (m === nextMonth && y === nextMonthYear);
        });
    }
    
  
    private cleanName(name: string): string {
      // Remove text in parentheses, e.g., "Janmashtami (Smarta)" → "Janmashtami"
      return name.replace(/\s*\(.*?\)/g, '').trim();
    }

}
