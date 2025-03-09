import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../../widget/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, type },
      duration: 3000, // Auto close after 3 seconds
      horizontalPosition: 'end', // Right side
      verticalPosition: 'bottom', // Bottom
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}
