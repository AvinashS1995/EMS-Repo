import { Injectable, signal } from '@angular/core';
import { SnackBarComponent } from '../../widget/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogData } from '../../interfaces/widget';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../widget/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  expandSidenav = signal<boolean>(true);

  ENCRYPTION_KEY = CryptoJS.enc.Hex.parse('232a3885f7ef6f1bf0136b055956a5f9a44e6633b8ef14f1016e014816f59d64');
  IV_LENGTH = 16; // bytes
  secretKey: string = ''; // Add this property


  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  // Decrypt encrypted secretKey from backend
  decryptSecretKey(encrypted: string): string {
    const [ivHex, encryptedData] = encrypted.split(':');
  
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, this.ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encryptWithKey(data: any, key: string): string {
    const keyWordArray = CryptoJS.enc.Hex.parse(key);
    const iv = CryptoJS.lib.WordArray.random(16); // Secure random IV
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), keyWordArray, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    return iv.toString() + ':' + encrypted.toString(); // Store both IV and data
  }
  
  decryptWithKey(data: string, key: string): any {
    const [ivHex, encryptedData] = data.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const keyWordArray = CryptoJS.enc.Hex.parse(key);
  
    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyWordArray, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  
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
        cancelText: data.cancelText || 'Cancel',
      },
    });

    return dialogRef.afterClosed();
  }
}
