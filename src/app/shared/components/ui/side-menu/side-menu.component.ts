import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Observable, Subscription } from 'rxjs';
import * as MenuSelector from '../../../../store/ui/menu.reducer';
import { ButtonModule } from 'primeng/button';
import * as MenuActions from '../../../../../actions/menu.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [TieredMenu, ButtonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

  items: MenuItem[] = [
    {
      label: 'Canciones',
      icon: 'pi pi-bullseye',
      command: () => {
        this.closeMenu();
        this.router.navigate(['/songs']);
      }
    },
    {
      separator: true,
    },
    {
      label: 'Artistas',
      icon: 'pi pi-user',
    },
    {
      separator: true,
    },
    {
      label: 'Compañías discográficas',
      icon: 'pi pi-shop',
    },
  ];

  isMenuOpen: boolean = false;
  isMenuOpen$!: Observable<boolean>;

  private menuSubscription!: Subscription;
  
  constructor(private store: Store, private router: Router) {
    this.isMenuOpen$ = this.store.select(MenuSelector.isSideMenuOpen);
  }

  getMenuState = () => {
    this.menuSubscription = this.isMenuOpen$.subscribe({
      next: (isOpen: boolean) => this.isMenuOpen = isOpen,
      error: (error: any) => console.log(error),
    });
  }

  closeMenu = () => this.store.dispatch(MenuActions.toggleSideMenu({isSideMenuOpen: false}));

  ngOnDestroy = () => {
    if(this.menuSubscription) this.menuSubscription.unsubscribe(); 
  }
}
