import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  faCode = faCode
}
