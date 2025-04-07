import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSkeletonComponent } from './song-skeleton.component';

describe('SongSkeletonComponent', () => {
  let component: SongSkeletonComponent;
  let fixture: ComponentFixture<SongSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
