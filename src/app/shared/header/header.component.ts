import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // @Input() title: string = '';

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
