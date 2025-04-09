import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopMenuComponent } from './top-menu.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { RouterTestingModule } from '@angular/router/testing';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';

describe('TopMenuComponent', () => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;
  let router: Router;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopMenuComponent,
        TranslocoModule,
        RouterTestingModule,
        MenubarModule
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

    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    translocoService = TestBed.inject(TranslocoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu', () => {
    expect(component.isMenuOpen).toBeDefined();
    expect(component.isMenuOpen).toBeFalse();
    expect(component.isMenuOpen$).toBeDefined();
  });
});
