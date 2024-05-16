import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface NavigationOption {
  link: string;
  title: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  options: NavigationOption [] = [
    { link: '/crear-contacto', title: 'Crear contacto' },
    { link: '/ver-contactos', title: 'Ver contactos' },
    { link: '/editar-contacto', title: 'Editar contacto' },
    { link: '/eliminar-contacto', title: 'Eliminar contacto' },
  ];
}
