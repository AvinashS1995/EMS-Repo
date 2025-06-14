import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common/common.service';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-menu-configuration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-menu-configuration.component.html',
  styleUrl: './create-menu-configuration.component.scss'
})
export class CreateMenuConfigurationComponent {

  createMenuForm!: FormGroup;

  menuList: Array<any> = [];
  isEditMode: Boolean = false;


  constructor(
        private commonService: CommonService,
        private apiService: ApiService,
        private activateRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
      ) {
        
      }

  ngOnInit() {
    this.prepareCreateMenuForm();
    this.getparams();
  }

  prepareCreateMenuForm() {
    this.createMenuForm = this.fb.group({
      menuTitle: [''],
      menuRoute: [''],
      menuComponentName: [''],
      parentMenu: [''],
      menuDescription: [''],
    })
  }

  getparams() {
    this.activateRoute.data.subscribe(params => {
      console.log("Menu Params--->", params)

      if (params['data']) {
        const menuData = params['data']?.menus?.data || []
        
        this.menuList  = this.buildMenuList(menuData)

        console.log(this.menuList)

        const { title, componentName, path, icon, description, parentId, mode } = params['data'].menuDetails || {}
        
        const parentMenu = this.menuList.find(item => item.value === parentId)
        console.log(parentMenu)

        if(mode === 'edit') {
          this.isEditMode = true;
          this.createMenuForm.patchValue({
            menuTitle: title || '',
            menuRoute: path || '',
            menuComponentName: componentName || '',
            parentMenu: parentMenu?.label || '',
            menuDescription: description || '',
          });

        }
      }
    })
  }

 buildMenuList(menus: any[], parentPath: string = ''): Array<any> {
  let result: Array<any> = [];

  for (const menu of menus) {
    const label = parentPath ? `${menu.title}` : menu.title;

    result.push({
      label: label,
      value: menu._id 
    });

    if (menu.childMenu && menu.childMenu.length > 0) {
      result = result.concat(this.buildMenuList(menu.childMenu, label));
    }
  }

  return result;
}

onSubmitMenuForm() {
  
}


  cancelForm() {
    this.router.navigateByUrl('/menu-configuration')
  }
}
