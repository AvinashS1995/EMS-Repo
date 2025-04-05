import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Sidenav } from '../../../shared/interfaces/sidenav';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common/common.service';
import { NgClass } from '@angular/common';
import { ApiService } from '../../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../../shared/constant';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  @Output() navigateEvent = new EventEmitter<string>()

  menuItems = signal<Sidenav[]> ([
    {
      title: "Dashboard",
      icon: "dashboard",
      route: "/dashboard",
      sequence: 1,
      role: "admin"
    },
    {
      title: "Employee Management",
      icon: "group_add",
      route: "/employee-management",
      sequence: 2,
      role: "admin"
    },
    {
      title: "Leave Management",
      icon: "beach_access",
      route: "/leave-management",
      sequence: 3,
      role: "admin"
    },{
      title: "Sales",
      icon: "currency_exchange",
      route: "/sales",
      sequence: 4,
      role: "admin"
    },
    {
      title: "Payroll",
      icon: "payments",
      route: "/payroll",
      sequence: 5,
      role: "admin"
    },
    {
      title: "Reports",
      icon: "description",
      route: "/reports",
      sequence: 6,
      role: "admin"
    },
    {
      title: "Logout",
      icon: "logout",
      route: "/logout",
      sequence: 7,
      role: "admin"
    }
  ])

  

  constructor(  private apiService: ApiService ,public commonService: CommonService) {}

  


  navigateTO(url: string) {
    this.navigateEvent.emit(url)
  }

}
