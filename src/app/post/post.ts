import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrls: ['./post.css']
})
export class PostComponent {
  mostrarMapa: boolean = false;

  diasDestacados = [20, 21, 22];
}
