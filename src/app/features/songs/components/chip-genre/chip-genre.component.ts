import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chip } from 'primeng/chip';
import { Song } from '../../../../core/models/song.model';

@Component({
  selector: 'ChipComponent',
  imports: [Chip],
  templateUrl: './chip-genre.component.html',
  styleUrl: './chip-genre.component.css'
})

export class ChipComponent {
  @Input() label!: string;
  @Input() song!: Song;

  @Output() remove = new EventEmitter<any>();

  constructor() { }

  onRemove = () => {
    this.remove.emit(this.song);
  }
}
