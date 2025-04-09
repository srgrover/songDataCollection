import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsApiService } from '../../../songs/services/songs-api.service';
import { Song } from '../../../../core/models/song.model';
import { Subscription } from 'rxjs';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  ToastMessageOptions,
} from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { ImportsModule } from './imports';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { ChipComponent } from '../../components/chip-genre/chip-genre.component';
import { SongSkeletonComponent } from '../../components/song-skeleton/song-skeleton.component';
import { CompanyApiService } from '../../../companies/services/company-api.service';
import { Company } from '../../../../core/models/company.model';

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
    ChipComponent,
    SongSkeletonComponent,
    DividerModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
})
export class SongComponent implements OnInit, OnDestroy {
  id: number | null = null;
  song: Song | null = null;
  companies: Company[] = [];

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

  private songSubscription: Subscription | undefined;
  private companySubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songsService: SongsApiService,
    private companyService: CompanyApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translocoService: TranslocoService
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? +paramId : null;
    if (!this.id) this.router.navigate(['/songs']); // TODO: 404 component
  }

  async ngOnInit() {
    this.getSong();
  }

  getSong = () => {
    this.songSubscription = this.songsService.getSong(this.id!).subscribe({
      next: (song) => {
        if(!song) this.goToSongs();

        this.song = song;
        this.companySubscription = this.companyService.getCompaniesBySongId(song.id).subscribe({
          next: (companies) => (this.companies = companies),
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: err.status === 404 ? '404 - Error' : 'Error',
              detail: err.message,
            });
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translocoService.translate('songs.song.http_get_error_404'),
          life: 3000,
        });

        setTimeout(() => {
          this.goToSongs();
        }, 2000);
      },
    });
  };

  goToSongs = () => {
    this.router.navigate(['/songs']);
  };

  onEdit = () => this.router.navigate(['/songs/edit/', this.id]);

  onDelete = (event: Event) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translocoService.translate('songs.song.remove_message'),
      header: this.translocoService.translate('songs.song.remove_title'),
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: this.translocoService.translate('songs.form.buttons.cancel'),
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.translocoService.translate('songs.song.remove_confirm'),
        severity: 'danger',
      },
      accept: () => {
        this.songsService.deleteSong(this.id!).subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Song deleted',
              life: 3000,
            });
            this.router.navigate(['/songs']);
          },
          error: (err: HttpErrorResponse) => {
            this.showErrorMessage({detail: err.status === 404 ? '404 - Error' : err.message});
          },
        });
      },
      reject: () => {},
    });
  };

  showSuccessMessage = (message: ToastMessageOptions) => {
    this.messageService.add({ ...message, life: 3000, severity: 'success' });
  };

  showErrorMessage = (message: ToastMessageOptions) => {
    this.messageService.add({ ...message, life: 3000, severity: 'error', summary: 'Error' });
  };

  onRemoveChipGenre = (genre: string) => {
    this.song!.genre = this.song!.genre.filter((g: string) => g !== genre);
    this.songsService.updateSong(this.song!.id, this.song!).subscribe({
      next: (song) => this.showSuccessMessage({detail: 'Genre deleted'}),
      error: (err: HttpErrorResponse) => console.error(err.message),
    })
  }

  onRemoveChipCompany = (company: Company) => {
    const actualCompany = this.companies.find((c: Company) => c.id === company.id);
    const {songs, ...rest} = actualCompany!;
    const newSongs = songs.filter((s: number) => s !== +this.song!.id);
    const companyForDelete = { songs: newSongs, ...rest };
    this.companyService.updateCompany(+(actualCompany!.id), companyForDelete).subscribe({
      next: () => {
        this.showSuccessMessage({detail: 'Company deleted'});
        this.companies = this.companies.filter((c: Company) => c.id !== company.id);
      },
      error: (err: HttpErrorResponse) => console.error(err.message),
    })
  }

  ngOnDestroy() {
    if (this.songSubscription) this.songSubscription.unsubscribe();
    if (this.companySubscription) this.companySubscription.unsubscribe();
  }
}
