import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { FooterLayoutComponent } from '../../layout/footer/footer.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';

@Component({
  selector: 'app-ver-contactos',
  standalone: true,
  imports: [HeaderLayoutComponent, FooterLayoutComponent, CommonModule],
  templateUrl: './ver-contactos.component.html',
  styleUrls: ['./ver-contactos.component.css'],
})
export class VerContactosComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe({
      next: (data) => {
        console.log('Contacts loaded successfully', data);
        this.contacts = data.data;
      },
    });
    };
    refreshContacts(): void {
      this.loadContacts();
    }
}
