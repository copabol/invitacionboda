import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
<section class="relative w-full min-h-[250px] py-5 flex flex-col items-center justify-center px-4 overflow-hidden"
  style="background: radial-gradient(circle at center, #ff004b 5%, #f22626 100%);">
  
  <!-- Contenido principal sobre el fondo -->
  <div class="relative text-center z-10">
    <img src="/iconos/boda.webp" alt="Semilla" class="w-18 h-10 mx-auto mb-2" />
    <h2 class="text-5xl sm:text-6xl font-serif text-white select-none greatvibes mb-4">
      Invitación
    </h2>

    <div class="flex flex-nowrap justify-center gap-1 text-center text-[#fde6ad] font-mono font-bold w-full max-w-full">
      <div class="flex flex-col items-center flex-1 min-w-0">
        <div class="bg-[#fde6ad] rounded-lg px-1 py-1 shadow-md w-full text-[#ff004b] leading-tight whitespace-nowrap text-[clamp(1rem,2.2vw,1.5rem)]">
          {{ days }}
        </div>
        <div class="mt-0.5 text-[0.9rem] uppercase tracking-widest text-yellow-200">Días</div>
      </div>
      <div class="flex flex-col items-center flex-1 min-w-0">
        <div class="bg-[#fde6ad] rounded-lg px-1 py-1 shadow-md w-full text-[#ff004b] leading-tight whitespace-nowrap text-[clamp(1rem,2.2vw,1.5rem)]">
          {{ hours }}
        </div>
        <div class="mt-0.5 text-[0.9rem] uppercase tracking-widest text-yellow-200">Horas</div>
      </div>
      <div class="flex flex-col items-center flex-1 min-w-0">
        <div class="bg-[#fde6ad] rounded-lg px-1 py-1 shadow-md w-full text-[#ff004b] leading-tight whitespace-nowrap text-[clamp(1rem,2.2vw,1.5rem)]">
          {{ minutes }}
        </div>
        <div class="mt-0.5 text-[0.9rem] uppercase tracking-widest text-yellow-200">Min</div>
      </div>
    </div>

    <p class="mt-6 text-yellow-200 font-light select-none px-4 text-center text-sm">
      ¡Nos casamos el 21 de septiembre!
    </p>
  </div>
</section>

  `,
  styles: [`
    @media (max-width: 480px) {
  .contador {
    gap: 0.5rem;
  }
  .contador .unidad > div:first-child {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
  }
}
  `]
})
export class ContadorComponent implements OnInit, OnDestroy {
  days = '00';
  hours = '00';
  minutes = '00';

  private intervalId: any;
  private targetDate = new Date(new Date().getFullYear(), 8, 14, 0, 0, 0); // 14 Septiembre

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas); // Agrega iconos FA localmente para este componente
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.days = this.hours = this.minutes = '00';
      clearInterval(this.intervalId);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = this.pad(d);
    this.hours = this.pad(h);
    this.minutes = this.pad(m);
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
