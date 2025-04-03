import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-top-menu',
  imports: [Toolbar, AvatarModule, ButtonModule, CommonModule, TranslocoModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})

export class TopMenuComponent {
  
}
