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

  showSuccess(
    key: string | string[],
    interpolateParams?: Object | undefined
  ): void {
    const i18nMessage = this.translateService.instant(key, interpolateParams);
    this.showMessage(i18nMessage, 'Success', 'success');
  }

  showError(
    key: string | string[],
    interpolateParams?: Object | undefined
  ): void {
    const i18nMessage = this.translateService.instant(key, interpolateParams);
    this.showMessage(i18nMessage, 'Error', 'error');
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
