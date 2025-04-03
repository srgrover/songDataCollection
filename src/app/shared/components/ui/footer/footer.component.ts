import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'FooterComponent',
  imports: [PanelModule, TranslocoModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  
}
