import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'FooterComponent',
  imports: [PanelModule, TranslocoModule, ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  currentLang = this.translocoService.getActiveLang();
  languages: string[] = [];
  constructor(private translocoService: TranslocoService) {
    const availableLangs = this.translocoService.getAvailableLangs();
    if (Array.isArray(availableLangs) && typeof availableLangs[0] === 'string') {
      this.languages = availableLangs as string[];
    } else {
      this.languages = (availableLangs as { id: string; label: string }[]).map(lang => lang.id);
    }
  }

  changeLanguage = (lang: string) => this.translocoService.setActiveLang(lang);
}
