import { Component } from '@angular/core';
import { IconDefinition, faEnvelopeOpen, faMusic, faDrum, faCalendarAlt, faCameraRetro, faShirt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  faEnvelopeOpen: IconDefinition = faEnvelopeOpen;
  faMusic: IconDefinition = faMusic;
  faDrum: IconDefinition = faDrum;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faCameraRetro: IconDefinition = faCameraRetro;
 faMapMarkerAlt = faMapMarkerAlt;


  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
