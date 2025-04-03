import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'FooterComponent',
  imports: [PanelModule, TranslocoModule, ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  
}
