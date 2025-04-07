import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsApiService } from '../../../songs/services/songs-api.service';
import { Song } from '../../../../core/models/song.model';
import { Subscription } from 'rxjs';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpErrorResponse } from '@angular/common/http';
import { translateObjectSignal } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { ImportsModule } from './imports';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { ChipGenreComponent } from '../../components/chip-genre/chip-genre.component';
import { SongSkeletonComponent } from '../../components/song-skeleton/song-skeleton.component';

@Component({
  selector: 'app-song',
  imports: [
    SongCardComponent,
    Toolbar,
    ButtonModule,
    InputTextModule,
    TranslocoModule,
    Tooltip,
    ImportsModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    ChipGenreComponent,
    SongSkeletonComponent,
    DividerModule
],
  providers: [MessageService, ConfirmationService],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
})
export class SongComponent implements OnInit, OnDestroy {
  translateSong = translateObjectSignal('songs.song');

  id: number | null = null;
  song: Song | null = null;

  items: MenuItem[] | undefined = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];

  editMode: boolean = false;

  private songSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songsService: SongsApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? +paramId : null;
    if (!this.id) this.router.navigate(['/songs']); // TODO: 404 component
  }

  async ngOnInit() {
    this.getSong();
  }

  getSong = () => {
    console.log(this.translateSong()['http_get_error_404']);
    this.songSubscription = this.songsService.getSong(this.id!).subscribe({
      next: (song) => (this.song = song),
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: err.status === 404 ? '404 - Error' : 'Error',
          detail: this.translateSong()['http_get_error_404'],
          life: 3000,
        });
      },
    });
  };

  goToSongs = () => {
    this.router.navigate(['/songs']);
  };

  onEdit = () => {
    this.editMode = true;
  };

  onSave = () => {
    this.editMode = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Guardado correctamente',
      life: 3000,
    });
  };

  onDelete = (event: Event) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.songsService.deleteSong(this.id!).subscribe({
          next: (data) => {
          console.log("🔍 ~ accept ~ src/app/features/dashboard/pages/song/song.component.ts:126 ~ data:", data)
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Song deleted',
              life: 3000,
            });
            this.router.navigate(['/songs']);
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: err.status === 404? '404 - Error' : err.message,
              life: 3000,
            });
          },
        });
      },
      reject: () => {

      },
    });
  };

  ngOnDestroy() {
    if (this.songSubscription) this.songSubscription?.unsubscribe();
  }
}
