import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipGenreComponent } from './chip-genre.component';

describe('ChipGenreComponent', () => {
  let component: ChipGenreComponent;
  let fixture: ComponentFixture<ChipGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
