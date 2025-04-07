import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-top-menu',
  imports: [Toolbar, AvatarModule, ButtonModule, CommonModule, TranslocoModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  isMenuOpen$!: Observable<boolean>;

  private menuSubscription!: Subscription;

  constructor(private store: Store) {
    this.isMenuOpen$ = this.store.select(MenuSelector.isSideMenuOpen);
  }
  
  ngOnInit(): void {
    this.getMenuState();
  }

  toggleMenu = () => {
    this.store.dispatch(MenuActions.toggleSideMenu({isSideMenuOpen: !this.isMenuOpen}));
  }
    
  getMenuState = () => {
    this.menuSubscription = this.isMenuOpen$.subscribe({
      next: (isOpen: boolean) => this.isMenuOpen = isOpen,
      error: (error: any) => console.log(error),
    });
  }

  ngOnDestroy = () => {
    if (this.menuSubscription) this.menuSubscription.unsubscribe();
  }
}
