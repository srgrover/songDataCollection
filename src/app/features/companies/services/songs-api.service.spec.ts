import { SongsApiService } from './songs-api.service';
import { TestBed } from '@angular/core/testing';

describe('SongsService', () => {
  let service: SongsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
