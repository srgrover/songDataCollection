import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SideMenuComponent } from "./shared/components/ui/side-menu/side-menu.component";
import { TopMenuComponent } from "./shared/components/ui/top-menu/top-menu.component";
import { FooterComponent } from "./shared/components/ui/footer/footer.component";
import { PanelModule } from 'primeng/panel';
import { Store } from '@ngrx/store';
import * as MenuSelector from './store/ui/menu.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, TranslocoModule, SideMenuComponent, TopMenuComponent, FooterComponent, PanelModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit  {
  isMenuOpen: boolean = false;
  isMenuOpen$!: Observable<boolean>;

  private menuSubscription!: Subscription;
  
  constructor(private store: Store) {
    this.isMenuOpen$ = this.store.select(MenuSelector.isSideMenuOpen);
  }

  ngOnInit() {
    this.getMenuState();
  }

  getMenuState() {
    this.menuSubscription = this.isMenuOpen$.subscribe({
      next: (isOpen: boolean) => this.isMenuOpen = isOpen,
      error: (error: any) => console.log(error),
    });
  }

  ngOnDestroy() {
    if(this.menuSubscription) this.menuSubscription.unsubscribe(); 
  }
}
