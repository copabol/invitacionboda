import { Component } from '@angular/core';
// Íconos de marcas (redes sociales)
import { faFacebook, faTiktok, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// Íconos sólidos
import { faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeWrapperModule } from '../../home/font-awesome-wrapper.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeWrapperModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Redes sociales
  faFacebook = faFacebook;
  faTiktok = faTiktok;
  faYoutube = faYoutube;
  faWhatsapp = faWhatsapp;

  // Íconos sólidos
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
}
