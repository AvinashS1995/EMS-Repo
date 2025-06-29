import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfigurationComponent } from './menu-configuration.component';

describe('MenuConfigurationComponent', () => {
  let component: MenuConfigurationComponent;
  let fixture: ComponentFixture<MenuConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
