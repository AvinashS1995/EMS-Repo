import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../../shared/services/common/common.service';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-configuration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu-configuration.component.html',
  styleUrl: './menu-configuration.component.scss'
})
export class MenuConfigurationComponent {

  menuFilterForm!: FormGroup;

  menuStatusList: Array<any> = [];

  menuList: Array<any> = [];

 childDisplayedColumns: string[] = ['sequence', 'title', 'path', 'component', 'action'];


  constructor(
      private commonService: CommonService,
      private apiService: ApiService,
      private activateRoute: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router
    ) {
      
    }

    ngOnInit() {
      this.prepareMenuFilterForm();
      this.getparam();
    }

  prepareMenuFilterForm() {
    this.menuFilterForm = this.fb.group({
          menuName: ['',],
          menuStatus: [''],
    })
  }

  getparam() {
    this.activateRoute.data.subscribe(params => {

      if (params['data']) {
        this.menuList = params['data'].menus.data || []

        console.log(this.menuList)
      }
    })
  }

  toggle(menu: any) {
    debugger
    menu.expanded = !menu.expanded;
  }

  createMenu() {
    this.router.navigateByUrl('/create-menu')
  }

  applyFilters() {

  }

  clearFilters() {

  }
}
