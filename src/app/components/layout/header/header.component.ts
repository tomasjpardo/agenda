import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';


@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderLayoutComponent {
title: string = 'AGENDA PERSONAL';
}
