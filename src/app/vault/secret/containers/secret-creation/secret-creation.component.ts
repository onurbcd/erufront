import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-secret-creation',
  templateUrl: './secret-creation.component.html',
  styleUrls: ['./secret-creation.component.css'],
})
export class SecretCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('vault.secret.formTitle');
  }
}
