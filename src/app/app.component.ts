import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  template: `
    <nav>
      <a [routerLink]=" ['./'] ">Start</a>
      <a [routerLink]=" ['./rechner'] ">Rechner</a>
      <a [routerLink]=" ['./impressum'] ">Impressum</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <ng2-adsense></ng2-adsense>
    </footer>
  `
})
export class AppComponent {
}
