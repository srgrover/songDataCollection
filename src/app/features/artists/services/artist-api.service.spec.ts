import { TestBed } from '@angular/core/testing';
import { ArtistsApiService } from './artist-api.service';

describe('ArtistsService', () => {
  let service: ArtistsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
