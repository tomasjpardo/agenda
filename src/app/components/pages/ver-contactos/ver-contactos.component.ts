import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { FooterLayoutComponent } from '../../layout/footer/footer.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-contactos',
  standalone: true,
  imports: [HeaderLayoutComponent, FooterLayoutComponent, CommonModule],
  templateUrl: './ver-contactos.component.html',
  styleUrls: ['./ver-contactos.component.css'],
})
export class VerContactosComponent implements OnInit {
  contacts: any[] = [];
  sortOrder: string = 'id'; // Default sort order

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.sortOrder = this.route.snapshot.queryParamMap.get('sortOrder') || 'id';
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe({
      next: (data) => {
        console.log('Contacts loaded successfully', data);
        this.contacts = data.data;
        this.sortContacts();
      },
      error: (error) => {
        console.error('Error loading contacts', error);
      }
    });
  }

  sortContacts(): void {
    if (this.sortOrder === 'name') {
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.contacts.sort((a, b) => a.id - b.id);
    }
  }

  setSortOrder(order: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortOrder: order },
      queryParamsHandling: 'merge',
    }).then(() => {
      this.sortOrder = order;
      this.loadContacts();
    });
  }
}
