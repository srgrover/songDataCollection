import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'SongSkeletonComponent',
  imports: [SkeletonModule, DividerModule],
  templateUrl: './song-skeleton.component.html',
  styleUrl: './song-skeleton.component.css'
})
export class SongSkeletonComponent {}
