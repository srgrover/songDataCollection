import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'SongSkeletonComponent',
  imports: [SkeletonModule],
  templateUrl: './song-skeleton.component.html',
  styleUrl: './song-skeleton.component.css'
})
export class SongSkeletonComponent {}
