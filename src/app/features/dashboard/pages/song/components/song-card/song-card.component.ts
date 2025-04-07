import { Component, Input } from '@angular/core';
import { Song } from '../../../../../../core/models/song.model';
import { Router } from '@angular/router';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'SongCard',
  imports: [ChipModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.css'
})
export class SongCardComponent {
  constructor(private router: Router) { }
  @Input() song!: Song;

  openSong = () => {
    this.router.navigate([`/songs/${this.song.id}`]);
  }
}
