import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { FooterLayoutComponent } from "../../layout/footer/footer.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderLayoutComponent, FooterLayoutComponent]
})
export class HomeComponent {

}
