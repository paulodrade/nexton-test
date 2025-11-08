import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App {
  isDarkThemeEnabled = false;

  toggleDarkTheme() {
    if (this.isDarkThemeEnabled) {
      document.body.classList.add('nex-theme-dark');
    } else {
      document.body.classList.remove('nex-theme-dark');
    }
  }
}
