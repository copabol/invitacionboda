import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ContadorComponent } from '../contador/contador';
import { PortadaComponent } from '../portada/portada';
import { FontAwesomeWrapperModule } from './font-awesome-wrapper.module';
import { faChevronLeft, faChevronRight, faPause, faPlay, faStop, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PostComponent } from '../post/post';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule, FormsModule, ContadorComponent, PostComponent, PortadaComponent, FontAwesomeWrapperModule],
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  backgroundAudio!: HTMLAudioElement;
  confirmForm: FormGroup;
  selectedFile: File | null = null;
  uploadMessage = '';
  isUploading = false;
  faPlay = faPlay;
   faPause = faPause;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faStop = faStop;

  audio: HTMLAudioElement | null = null;
  activeAudios: HTMLAudioElement[] = [];

  constructor(
    private fb: FormBuilder,
    private viewportScroller: ViewportScroller,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
  
  ) {
    this.confirmForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  images = [
        
    { url: '/audios/loscapos.png', text: 'los capos', audio: '/audios/loscapos.ogg' },
    { url: '/audios/helena.webp', text: 'Helena', audio: '/audios/helena.ogg' },
    { url: '/audios/purpura.webp', text: 'Purpura', audio: '/audios/purpura.ogg' },
    { url: '/audios/amarbolivia.webp', text: 'Amar Bolivia', audio: '/audios/amarbolivia.ogg' },
    { url: '/audios/danielnunez.webp', text: 'Daniel Nuñez', audio: '/audios/danielnunez.ogg' },
    { url: '/audios/juniormorales.webp', text: 'Junior Morales', audio: '/audios/juniormorales.ogg' },
    { url: '/audios/eclisma.webp', text: 'Eclisma', audio: '/audios/eclisma.ogg' },
    { url: '/audios/banda.webp', text: 'Super Explosion', audio: '/audios/banda.ogg' },


  ];

  programa = [
    { hora: '10:00 hrs', nombre: 'Ceremonia', icono: '/iconos/iglesia.svg' },
    { hora: '17:00 hrs', nombre: 'Llegada', icono: 'iconos/anillos.svg' },
    { hora: '18:00 hrs', nombre: 'Brindis', icono: '/iconos/champan.svg' },
    { hora: '19:00 hrs', nombre: 'Recepcion', icono: '/iconos/fiesta.svg' },
    { hora: '20:00 hrs', nombre: 'Cena', icono: '/iconos/cena.svg' },
    { hora: '22:00 hrs', nombre: 'Torta', icono: '/iconos/torta.svg' },
    { hora: '00:00 hrs', nombre: 'Fin', icono: '/iconos/salon.svg' }
  ];

  currentAudio: HTMLAudioElement | null = null;
  currentAudioUrl: string | null = null;
  isBackgroundPlaying: boolean = false;
  isPlaying: boolean = false;

  backgroundAudioUrl = '/audios/boda.ogg';
  codigo: string = '';
  mostrarVideo: boolean = false;
  videoURL: string = 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1234567890&show_text=0&autoplay=0';
  videoSrc: SafeResourceUrl | null = null;
  portadaVideoUrl = '/invitacion.webp';
  mostrarPortada = true;
  @ViewChild('videoIframe') videoIframe!: ElementRef<HTMLIFrameElement>;

  // Fotografía privada
  codigoFotos: string = '';
  mostrarFotos: boolean = false;
  fotosPrivadas: string[] = [
    'https://via.placeholder.com/300x200?text=Privada+1',
    'https://via.placeholder.com/300x200?text=Privada+2',
    'https://via.placeholder.com/300x200?text=Privada+3',
    'https://via.placeholder.com/300x200?text=Privada+4'
  ];

  showFolklorico: boolean = false;
  showDiana: boolean = false;

  activeIndex = -1;

  zoomImageUrl: string | null = null;
  zoomedIndex: number = -1;

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    this.backgroundAudio = new Audio(this.backgroundAudioUrl);
    this.backgroundAudio.loop = true;
    this.backgroundAudio.volume = 0.5;
    this.activeAudios.push(this.backgroundAudio);

    this.audio = new Audio();
  }
}

  ngAfterViewInit(): void {
    window.addEventListener('message', this.onMessageReceived);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onMessageReceived);
  }

reproducirVideo() {
  this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/zggXqZ7a4h8?enablejsapi=1&rel=0&modestbranding=1&controls=1'
  );
  this.mostrarPortada = false;
  this.stopAllAudios(this.backgroundAudio);
  if (this.backgroundAudio && !this.backgroundAudio.paused) {
    this.backgroundAudio.pause();
    this.isBackgroundPlaying = false;
  }
}

onMessageReceived = (event: MessageEvent) => {
  try {
    const data = JSON.parse(event.data);
    if (data.event === 'onStateChange' && data.info === 0) {
      this.videoSrc = null;   // usar null en vez de string vacía
      this.mostrarPortada = true;
    }
  } catch (_) {}
};

  toggleVestimenta(tipo: 'folklorico' | 'diana') {
    if (tipo === 'folklorico') {
      this.showFolklorico = !this.showFolklorico;
    } else if (tipo === 'diana') {
      this.showDiana = !this.showDiana;
    }
  }

  stopAllAudios(except?: HTMLAudioElement): void {
    this.activeAudios.forEach(audio => {
      if (audio !== except && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

bars: number[] = Array(20).fill(10);
interval: any;

// Reproducir track individual
playAudio(audioUrl: string): void {
  if (typeof window === 'undefined') return;

  // Si ya se reproduce el mismo audio → stop
  if (this.currentAudio && this.currentAudioUrl === audioUrl && this.isPlaying) {
    this.currentAudio.pause();
    this.isPlaying = false;
    this.stopBars();
    return;
  }

  // Detener cualquier otro track individual
  if (this.currentAudio && this.currentAudio !== this.backgroundAudio) {
    this.currentAudio.pause();
    this.stopBars();
  }

  // Detener música de fondo si está sonando
  if (this.backgroundAudio && !this.backgroundAudio.paused) {
    this.backgroundAudio.pause();
    this.isBackgroundPlaying = false;
  }

  // Crear nuevo audio
  const newAudio = new Audio(audioUrl);
  newAudio.volume = 1;
  newAudio.play();

  this.currentAudio = newAudio;
  this.currentAudioUrl = audioUrl;
  this.isPlaying = true;

  this.startBars(); // animación solo para tracks

  newAudio.onended = () => {
    this.isPlaying = false;
    this.stopBars();
  };
}

// Reproducir/pausar música de fondo
toggleBackgroundAudio(): void {
  if (!this.backgroundAudio) return;

  if (this.backgroundAudio.paused) {
    // Detener cualquier track individual que esté sonando
    if (this.currentAudio && this.currentAudio !== this.backgroundAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.stopBars();
    }

    this.backgroundAudio.play();
    this.isBackgroundPlaying = true;
  } else {
    this.backgroundAudio.pause();
    this.isBackgroundPlaying = false;
  }
}

// Animación de barras
startBars() {
  if (this.interval) clearInterval(this.interval);
  this.interval = setInterval(() => {
    if (!this.isPlaying) return;
    // Crea nueva referencia para que Angular detecte cambios
    this.bars = this.bars.map(() => this.randomHeight()).slice();
    this.cd.detectChanges(); // fuerza renderizado
  }, 150);
}

stopBars() {
  if (this.interval) clearInterval(this.interval);
  this.bars = this.bars.map(() => 10).slice();
  this.cd.detectChanges();
}

randomHeight() {
  return Math.floor(Math.random() * 50) + 10; // alturas entre 10 y 60px
}

  getColSpan(index: number): string {
    return `box-${index + 1}`;
  }

  get gridTemplateStyle(): string {
    const count = this.images.length;
    const columns = Array(count).fill('1fr');
    if (this.activeIndex !== -1) {
      columns.fill('0.5fr');
      columns[this.activeIndex] = '2.5fr';
    }
    return columns.join(' ');
  }

  scrollToSection(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  expandirVideo: boolean = false; // si quieres el mismo efecto en video
  expandirFotos: boolean = false; // controla si la caja de fotos se expande
   toggleExpandVideo() {
    this.expandirVideo = !this.expandirVideo;
  }

  toggleExpandFotos() {
    this.expandirFotos = !this.expandirFotos;
  }
  // Verificar código del video
  verificarCodigo() {
    if (this.codigo === 'CALLAPA') {
      this.mostrarVideo = true;
    } else {
      alert('Código incorrecto. Inténtalo nuevamente.');
    }
  }
  // Verificar código de fotos
  verificarCodigoFotos() {
    if (this.codigoFotos === 'FOTOS') {
      this.mostrarFotos = true;
    } else {
      alert('Código incorrecto para fotografías.');
    }
  }
  
}
