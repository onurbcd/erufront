import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(
    private translateService: TranslateService,
    public matSnackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  showSuccess(message: string): void {
    const i18nMessage = this.translateService.instant(message);
    this.showMessage(i18nMessage, 'Success', 'success');
  }

  showError(message: string): void {
    this.showMessage(message, 'Error', 'error');
  }

  private showMessage(
    message: string,
    action: string,
    panelClass: string | string[],
    duration: number = 5000
  ): void {
    this.zone.run(() => {
      this.matSnackBar.open(message, action, { duration, panelClass });
    });
  }
}
