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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, TranslocoModule, SideMenuComponent, TopMenuComponent, FooterComponent, PanelModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit  {
  mobileVersion = false;
  isMenuOpen: boolean = false;
  isMenuOpen$!: Observable<boolean>;

  private menuSubscription!: Subscription;
  
  constructor(private store: Store, private breakpointObserver: BreakpointObserver) {
    this.isMenuOpen$ = this.store.select(MenuSelector.isSideMenuOpen);

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobileVersion = result.matches && result.breakpoints[Breakpoints.HandsetPortrait];
      });
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

  generateDynamicClassname = () => {
    if (!this.mobileVersion) return 'col-start-1 row-start-1 border-r-1 border-gray-200 bg-neutral-100';
    return this.isMenuOpen ? 'absolute bg-neutral-100 w-full z-1' : 'hidden';
  }

  ngOnDestroy() {
    if(this.menuSubscription) this.menuSubscription.unsubscribe(); 
  }
}
