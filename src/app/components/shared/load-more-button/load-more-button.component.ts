import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  imports: [CommonModule],
  templateUrl: './load-more-button.component.html',
})
export class LoadMoreButtonComponent {
  @Input() haveMoreThought: boolean = false;
}
