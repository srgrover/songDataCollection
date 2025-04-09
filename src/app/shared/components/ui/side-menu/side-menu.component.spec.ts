import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let router: Router;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SideMenuComponent,
        TranslocoModule,
        RouterTestingModule,
        SidebarModule,
        ButtonModule
      ],
      providers: [
        {
          provide: TranslocoService,
          useValue: {
            translate: (key: string) => key
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    translocoService = TestBed.inject(TranslocoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sidebar closed', () => {
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should close sidebar', () => {
    component.isMenuOpen = true;
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should navigate and close sidebar when menu item is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isMenuOpen = true;

    component.navigateTo('/songs');

    expect(component.isMenuOpen).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/songs']);
  });

  it('should render toggle button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('p-button');
    
    expect(button).toBeTruthy();
  });

  it('should render sidebar when visible', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const sidebar = compiled.querySelector('p-sidebar');
    
    expect(sidebar).toBeTruthy();
  });

  it('should render menu items in sidebar', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const menuItems = compiled.querySelectorAll('.menu-item');
    
    expect(menuItems.length).toBeGreaterThan(0);
  });
});
