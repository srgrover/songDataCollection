import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongFormComponent } from './song-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { SongsApiService } from '../../services/songs-api.service';
import { ArtistsApiService } from '../../../artists/services/artist-api.service';
import { of, throwError } from 'rxjs';
import { Artist } from '../../../../core/models/artist.model';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;
  let songsService: jasmine.SpyObj<SongsApiService>;
  let artistsService: jasmine.SpyObj<ArtistsApiService>;
  let messageService: jasmine.SpyObj<MessageService>;

  const mockSong = {
    id: 1,
    title: 'Test Song',
    duration: 180,
    genre: ['Rock'],
    year: 2023,
    rating: 8,
    artist: 1,
    poster: 'test.jpg'
  };

  const mockArtists: Artist[] = [
    {
      id: "1",
      name: "John Mayer",
      bornCity: "Conecticut",
      birthdate: "16/10/1977",
      img: "http://dummyimage.com/600x400.png/dddddd/000000",
      rating: 9.03,
      songs: [
        1,
        6
      ]
    },
    {
      id: "2",
      name: "The Beatles",
      bornCity: "Liverpool",
      birthdate: "19/04/1975",
      img: "http://dummyimage.com/600x400.png/5fa2dd/000000",
      rating: 2.43,
      songs: [
        2,
        3
      ]
    },
    {
      id: "3",
      name: "John Lennon",
      bornCity: "Liverpool",
      birthdate: "10/04/1986",
      img: null,
      rating: 7.92,
      songs: [
        2,
        3,
        8
      ]
    },
    {
      id: "4",
      name: "The Rolling Stones",
      bornCity: "London",
      birthdate: "04/08/1990",
      img: "http://dummyimage.com/600x400.png/4fa25d/000000",
      rating: 4.37,
      songs: [
        4,
        8
      ]
    }];

  beforeEach(async () => {
    const songsSpy = jasmine.createSpyObj('SongsApiService', ['getSong', 'addSong', 'updateSong']);
    const artistsSpy = jasmine.createSpyObj('ArtistsApiService', ['getArtists']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [
        SongFormComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslocoModule
      ],
      providers: [
        { provide: SongsApiService, useValue: songsSpy },
        { provide: ArtistsApiService, useValue: artistsSpy },
        { provide: MessageService, useValue: messageSpy },
        {
          provide: TranslocoService,
          useValue: { translate: (key: string) => key }
        }
      ]
    }).compileComponents();

    songsService = TestBed.inject(SongsApiService) as jasmine.SpyObj<SongsApiService>;
    artistsService = TestBed.inject(ArtistsApiService) as jasmine.SpyObj<ArtistsApiService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    artistsService.getArtists.and.returnValue(of(mockArtists));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.songForm.get('title')?.value).toBe('');
    expect(component.songForm.get('duration')?.value).toBe('');
    expect(component.genres()).toEqual([]);
  });

  it('should load artists on init', () => {
    expect(artistsService.getArtists).toHaveBeenCalled();
    expect(component.artists).toEqual(mockArtists);
  });

  it('should load song data in edit mode', () => {
    songsService.getSong.and.returnValue(of(mockSong));
    component.songId = 1;
    component.loadSong(1);

    expect(component.songForm.get('title')?.value).toBe(mockSong.title);
    expect(component.songForm.get('duration')?.value).toBe(mockSong.duration);
    expect(component.genres()).toEqual(mockSong.genre);
  });

  it('should handle song load error', () => {
    songsService.getSong.and.returnValue(throwError(() => new Error('Error')));
    component.loadSong(1);

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'songs.form.load_error',
      life: 3000
    });
  });

  it('should add genre', () => {
    component.addGenre('Rock');
    expect(component.genres()).toContain('Rock');
  });

  it('should remove genre', () => {
    component.addGenre('Rock');
    component.removeGenre('Rock');
    expect(component.genres()).not.toContain('Rock');
  });

  it('should submit form with valid data', () => {
    songsService.addSong.and.returnValue(of(mockSong));
    
    component.songForm.patchValue({
      title: 'Test Song',
      duration: 180,
      year: 2023,
      rating: 8,
      artist: '1',
      poster: 'test.jpg'
    });
    component.genres.set(['Rock']);

    component.onSubmit();

    expect(songsService.addSong).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'songs.form.create_success',
      life: 3000
    });
  });
});