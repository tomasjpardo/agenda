import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EliminarContactosComponent } from './eliminar-contactos.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';
import { of } from 'rxjs';

describe('EliminarContactosComponent', () => {
  let component: EliminarContactosComponent;
  let fixture: ComponentFixture<EliminarContactosComponent>;
  let mockContactsService: any;

  beforeEach(async () => {
    mockContactsService = {
      getContacts: jasmine.createSpy('getContacts').and.returnValue(of([
        { id: 1, name: 'John Doe', phone: '123456789', email: 'john@example.com', address: '123 Street' },
        { id: 2, name: 'Jane Doe', phone: '987654321', email: 'jane@example.com', address: '456 Avenue' }
      ])),
      deleteContact: jasmine.createSpy('deleteContact').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [EliminarContactosComponent],
      providers: [
        { provide: ContactsService, useValue: mockContactsService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(EliminarContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    expect(component.contacts.length).toBe(2);
    expect(component.contacts[0].name).toBe('John Doe');
    expect(component.contacts[1].name).toBe('Jane Doe');
  });

  it('should select a contact', () => {
    const contact = { id: 1, name: 'John Doe', phone: '123456789', email: 'john@example.com', address: '123 Street' };
    component.selectContact(contact);
    expect(component.selectedContact).toEqual(contact);
  });

  it('should confirm and delete a contact', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const contact = { id: 1, name: 'John Doe', phone: '123456789', email: 'john@example.com', address: '123 Street' };
    component.selectContact(contact);
    component.confirmDelete();
    expect(mockContactsService.deleteContact).toHaveBeenCalledWith({ deleteId: '1' });
    expect(window.confirm).toHaveBeenCalled();
  });

  it('should not delete a contact if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const contact = { id: 1, name: 'John Doe', phone: '123456789', email: 'john@example.com', address: '123 Street' };
    component.selectContact(contact);
    component.confirmDelete();
    expect(mockContactsService.deleteContact).not.toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalled();
  });
});
