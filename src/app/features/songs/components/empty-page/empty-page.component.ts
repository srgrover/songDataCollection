import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'EmptyPageComponent',
  imports: [TranslocoModule, Button, Tooltip],
  templateUrl: './empty-page.component.html',
})
export class EmptyPageComponent {
  constructor(private router: Router) {}
  navigateToNewSong = () => this.router.navigate(['/songs/new']); 
}
