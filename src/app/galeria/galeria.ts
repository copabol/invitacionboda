import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.html',
  imports: [CommonModule],
  styleUrls: ['./galeria.css']
})
export class GaleriaComponent {
 images = [
  { url: 'https://live.staticflickr.com/65535/54599364159_9a5046998b_z.jpg', title: 'Iglesia' },
  { url: 'https://live.staticflickr.com/65535/54615570122_77341e8489_z.jpg', title: 'Iglesia' },
  { url: 'https://live.staticflickr.com/65535/54616668083_445c4b0628_z.jpg', title: 'Iglesia' },
];

}
