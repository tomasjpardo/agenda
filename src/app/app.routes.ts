import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CrearContactosComponent } from './components/pages/crear-contactos/crear-contactos.component';
import { VerContactosComponent } from './components/pages/ver-contactos/ver-contactos.component';
import { EditarContactosComponent } from './components/pages/editar-contactos/editar-contactos.component';
import { EliminarContactosComponent } from './components/pages/eliminar-contactos/eliminar-contactos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'crear-contacto',
        component: CrearContactosComponent,
    },
    {
        path: 'ver-contactos',
        component: VerContactosComponent,
    },
    {
        path: 'editar-contacto',
        component: EditarContactosComponent,
    },
    {
        path: 'eliminar-contacto',
        component: EliminarContactosComponent,
    },
];
