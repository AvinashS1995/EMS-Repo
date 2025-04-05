import { Injectable, signal } from '@angular/core';
import { SnackBarComponent } from '../../widget/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogData } from '../../interfaces/widget';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../widget/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  expandSidenav = signal<boolean>(true);

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  openSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, type },
      duration: 3000, // Auto close after 3 seconds
      horizontalPosition: 'end', // Right side
      verticalPosition: 'bottom', // Bottom
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

  showConfirmationDialog(data: ConfirmationDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '650px',
      data: {
        title: data.title,
        message: data.message,
        confirmText: data.confirmText || 'Confirm',
        cancelText: data.cancelText || 'Cancel'
      },
    });

    return dialogRef.afterClosed();
  }
}
