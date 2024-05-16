import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { FooterLayoutComponent } from '../../layout/footer/footer.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-contactos',
  standalone: true,
  imports: [HeaderLayoutComponent, FooterLayoutComponent, FormsModule],
  templateUrl: './crear-contactos.component.html',
  styleUrl: './crear-contactos.component.css'
})
export class CrearContactosComponent {
  contact = { name: '', phone: '', email: '', address: '' };

  constructor(private contactsService: ContactsService) {}

  createContact(contactForm: NgForm): void {
    if (contactForm.invalid) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    this.contactsService.createContact(this.contact).subscribe({
      next: (data) => {
        console.log('Contact created successfully', data);
        alert(
          `El contacto con nombre: ${this.contact.name}, ` +
          `telefono: ${this.contact.phone}, email: ${this.contact.email} ` +
          `y dirección: ${this.contact.address} ha sido creado exitosamente.`
        );
        contactForm.resetForm();
      },
      error: (error) => {
        console.error('Error creating contact', error);
      }
    });
  }
}
