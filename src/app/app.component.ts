import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SideMenuComponent } from "./shared/components/ui/side-menu/side-menu.component";
import { TopMenuComponent } from "./shared/components/ui/top-menu/top-menu.component";
import { FooterComponent } from "./shared/components/ui/footer/footer.component";
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, TranslocoModule, SideMenuComponent, TopMenuComponent, FooterComponent, PanelModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Songs data collector App - Sequence';
}
