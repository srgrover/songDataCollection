import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { translateSignal, TranslocoModule } from '@jsverse/transloco';
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

@Component({
  selector: 'app-song-form',
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
],
  providers: [MessageService],
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
  @ViewChild('inputGenre') inputGenre!: HTMLInputElement;

  song: Song | null = null;
  songForm: FormGroup;
  isEditMode = false;
  songId: number | null = null;

  genres: string[] = [];
  newGenre: string = '';

  constructor(
    private fb: FormBuilder,
    private songsService: SongsApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      artist: ['', Validators.required],
      poster: ['', Validators.required],
    });
  }
  ngOnInit(): void {
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

        this.songForm.patchValue({
          title: song.title,
          duration: song.duration,
          year: song.year,
          rating: song.rating,
          artist: song.artist,
          poster: song.poster,
        });
        this.genres = [...song.genre];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'error',
          life: 3000
        });
      }
    });
  }

  addGenre(newGenre: string): void {
    if (newGenre.trim()) {
      newGenre.trim().split(',').map(genre => {
        this.genres.push(genre.trim());
      });
      this.newGenre = '';
    }
  }

  removeGenre(genre: string): void {
  console.log("🔍 ~ removeGenre ~ src/app/features/songs/pages/song-form/song-form.component.ts:110 ~ genre:", genre)
  console.log("🔍 ~ removeGenre ~ src/app/features/songs/pages/song-form/song-form.component.ts:112 ~ this.genres:", this.genres)
  this.genres = this.genres.filter(f => f !== genre);
  console.log("🔍 ~ removeGenre ~ src/app/features/songs/pages/song-form/song-form.component.ts:112 ~ this.genres:", this.genres)
  }

  onSubmit(): void {
    if (this.songForm.valid && this.genres.length > 0) {
      const songData: Song = {
        ...this.songForm.value,
        genre: this.genres
      };

      const action = this.isEditMode
        ? this.songsService.updateSong(this.songId!, songData)
        : this.songsService.addSong(songData);

      action.subscribe({
        next: (res: Song) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.isEditMode 
              ? translateSignal('songs.form.update_success')()
              : translateSignal('songs.form.create_success')(),
            life: 3000
          });
          this.router.navigate(['/songs']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: translateSignal('songs.form.save_error')(),
            life: 3000
          });
        }
      });
    }
  }

  goToSongs(): void {
    this.router.navigate(['/songs']);
  }
}