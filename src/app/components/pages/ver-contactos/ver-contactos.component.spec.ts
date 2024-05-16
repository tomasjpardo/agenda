import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas HTTP
import { VerContactosComponent } from './ver-contactos.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';
import { of } from 'rxjs'; // Importa 'of' para crear observables simulados

describe('VerContactosComponent', () => {
  let component: VerContactosComponent;
  let fixture: ComponentFixture<VerContactosComponent>;
  let mockContactsService: any;

  beforeEach(async () => {
    mockContactsService = {
      getContacts: jasmine.createSpy('getContacts').and.returnValue(of([
        { name: 'John Doe', phone: '123456789', email: 'john@example.com', address: '123 Street' },
        { name: 'Jane Doe', phone: '987654321', email: 'jane@example.com', address: '456 Avenue' }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas HTTP
      declarations: [VerContactosComponent],
      providers: [
        { provide: ContactsService, useValue: mockContactsService } // Proporciona el servicio simulado
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(VerContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta la detección de cambios inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    // Comprueba que la lista de contactos se cargue correctamente
    expect(component.contacts.length).toBe(2);
    expect(component.contacts[0].name).toBe('John Doe');
    expect(component.contacts[1].name).toBe('Jane Doe');
  });
});
