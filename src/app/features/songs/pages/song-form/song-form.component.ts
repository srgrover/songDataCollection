import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroup } from 'primeng/inputgroup';
import { SongsApiService } from '../../services/songs-api.service';
import { Song } from '../../../../core/models/song.model';
import { DropdownModule } from 'primeng/dropdown';
import { ArtistsApiService } from '../../../artists/services/artist-api.service';
import { Artist } from '../../../../core/models/artist.model';
import { Image } from 'primeng/image';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'SongFormComponent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    ChipModule,
    InputGroupAddonModule,
    InputGroup,
    DropdownModule,
    Image,
    Dialog
],
  providers: [MessageService],
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
  song: Song | null = null;
  songForm: FormGroup;
  isEditMode = false;
  songId: number | null = null;

  // Por usar signals para el ejemplo
  genres = signal<string[]>([]);
  newGenre: string = '';
  artists: Artist[] = [];

  defaultPoster: string

  constructor(
    private fb: FormBuilder,
    private songsService: SongsApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
    private artistsService: ArtistsApiService
  ) {
    this.defaultPoster = `http://dummyimage.com/400x600.png/${this.generateColorHex()}/ffffff`;
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      rating: ['', [Validators.min(0), Validators.max(10)]],
      artist: [null],
      poster: [this.defaultPoster, Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadArtists()
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.songId = +id;
      this.loadSong(this.songId);
    }
  }

  loadSong(id: number): void {
    this.songsService.getSong(id).subscribe({
      next: (song) => {
        this.song = song;
        this.songForm.patchValue({
          title: song.title,
          duration: song.duration,
          year: song.year,
          rating: song.rating,
          artist: song.artist.toString(),
          poster: song.poster,
        });
        this.genres.set([...song.genre]);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translocoService.translate('songs.form.load_error'),
          life: 3000
        });
      }
    });
  }

  addGenre(newGenre: string): void {
    if (newGenre.trim()) {
      newGenre.trim().split(',').map(genre => {
        this.genres.update(genres => [...genres, genre]) ;
      });
      this.newGenre = '';
    }
  }

  removeGenre = (genre: string): void => this.genres.update(genres => genres.filter(g => g !== genre));

  onSubmit(): void {
    if (this.songForm.valid) {
      const { artist, ...rest} = this.songForm.value;
      const songData: Song = {
        artist: +artist,
        ...rest,
        genre: this.genres()
      };

      const action = this.isEditMode
        ? this.songsService.updateSong(this.songId!, songData)
        : this.songsService.addSong(songData);

      action.subscribe({
        next: async (res: Song) => {
          await this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.isEditMode 
              ? this.translocoService.translate('songs.form.update_success')
              : this.translocoService.translate('songs.form.create_success'),
            life: 3000
          });

          this.callback();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.translocoService.translate('songs.form.save_error'),
            life: 3000
          });
        }
      });
    }
  }

  callback(): void {
    setTimeout(() => {
      this.router.navigate([`/songs/${this.songId}`]);
    }, 1500);
  }

  loadArtists(): void {
    this.artistsService.getArtists().subscribe({
      next: (artists) => this.artists = artists,
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translocoService.translate('songs.form.load_artists_error'),
          life: 3000
        });
      }
    });
  }

  visible: boolean = false;
  position: 'bottom' | 'center' = 'center';

  onHideDialog = () => this.visible = false;

  onChangePosterDialog = (position: 'bottom' | 'center') => {
    this.position = position;
    this.visible = true;
  }

  getSongPoster = (): string => {
    return this.song?.poster || this.defaultPoster;
  };

  onChangePoster = (url: string) => {
    const posterUrl = url || this.defaultPoster;
    this.songForm.patchValue({
      poster: posterUrl
    }); 
    if (this.song) this.song.poster = posterUrl;
  }

  private generateColorHex(): string {
    const characters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
}