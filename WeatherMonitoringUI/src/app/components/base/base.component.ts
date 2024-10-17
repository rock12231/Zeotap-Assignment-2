import { Component } from '@angular/core';
import { LeftbarComponent } from "../leftbar/leftbar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HomeComponent } from "../home/home.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [LeftbarComponent, NavbarComponent, HomeComponent, FooterComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

}
