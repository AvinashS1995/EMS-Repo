import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CommonService } from './shared/services/common/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EMS-FrontEnd';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.setUserDetailsFromToken();
  }
}
