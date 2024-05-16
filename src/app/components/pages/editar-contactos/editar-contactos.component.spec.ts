import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FooterLayoutComponent } from '../../layout/footer/footer.component';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';

@Component({
  selector: 'app-editar-contactos',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-contactos.component.html',
  styleUrls: ['./editar-contactos.component.css'],
})
export class EditarContactosComponent implements OnInit {
  contacts: any[] = [];
  contact: any = { id: null, name: '', phone: '', email: '', address: '' };

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
    this.contact = { ...contact };
  }

  updateContact(): void {
    if (!this.contact.id) {
      alert('Por favor, selecciona un contacto.');
      return;
    }
    if (
      !this.contact.name ||
      !this.contact.phone ||
      !this.contact.email ||
      !this.contact.address
    ) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    const updatedContact: any = {};
    for (const key in this.contact) {
      if (this.contact[key]) {
        updatedContact[key] = this.contact[key];
      }
    }

    this.contactsService.updateContact(updatedContact).subscribe({
      next: (data) => {
        console.log('Contact updated successfully', data);
        alert(`El contacto con ID: ${this.contact.id} ha sido actualizado exitosamente.`);
        this.loadContacts();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error updating contact', error);
      }
    });
  }

  resetForm(): void {
    this.contact = { id: null, name: '', phone: '', email: '', address: '' };
  }
}
