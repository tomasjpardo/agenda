import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterLayoutComponent } from '../../layout/footer/footer.component';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';

@Component({
  selector: 'app-eliminar-contactos',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './eliminar-contactos.component.html',
  styleUrls: ['./eliminar-contactos.component.css'],
})
export class EliminarContactosComponent implements OnInit {
  contacts: any[] = [];
  selectedContact: any = null;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data.data;
        console.log('Contactos: ', this.contacts);
      },
      error: (error) => {
        console.error('Hubo un error al traer los contactos: ', error);
      }
    });
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
    // Desplazarse a la parte superior de la página
    document.getElementById('confirmation-dialog')?.scrollIntoView({ behavior: 'smooth' });
  }

  confirmDelete(): void {
    const confirmed = confirm(
      `¿Estás seguro de que quieres borrar el contacto con ID: ${this.selectedContact.id}? Esta acción es irreversible.`
    );
    if (confirmed) {
      this.deleteContact(this.selectedContact.id);
    }
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact({ deleteId: id.toString() }).subscribe({
      next: () => {
        alert(`El contacto con ID: ${id} ha sido borrado exitosamente.`);
        this.loadContacts();
        this.selectedContact = null;
      },
      error: (error) => {
        console.error('Error deleting contact', error);
      }
    });
  }
}
