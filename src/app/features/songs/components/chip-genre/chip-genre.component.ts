import { Component, Input, ViewChild } from '@angular/core';
import { Chip } from 'primeng/chip';
import { SongsApiService } from '../../../companies/services/songs-api.service';
import { Song } from '../../../../core/models/song.model';

@Component({
  selector: 'ChipGenreComponent',
  imports: [Chip],
  templateUrl: './chip-genre.component.html',
  styleUrl: './chip-genre.component.css'
})
export class ChipGenreComponent {
  @ViewChild('chip') chip!: Chip;
  @Input() genre!: string;
  @Input() song!: Song;

  constructor(private songsApiService: SongsApiService) { }

  onRemoveChip = (genre: string) => {
    this.song.genre = this.song.genre.filter((g: string) => g !== genre);
    this.songsApiService.updateSong(this.song.id, this.song).subscribe({
      next: (resp) => {
        console.log(resp, "TODO OK, ELIMINADO")
      },
    })
  }
}
