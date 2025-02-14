import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Thinking } from '../../interfaces/thinking';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ThinkingService } from '../../services/thinking.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-thought',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './thought.component.html',
})
export class ThoughtComponent {
  @Input() thinking: Thinking = {
    id: 0,
    content: 'I love Angular',
    auth: 'Luan',
    model: 'model1',
  };
  @Output() loadList = new EventEmitter();
  confirmationDialogService = inject(ConfirmationDialogService);
  constructor(private readonly service: ThinkingService) { }
  icons = { edit: faEdit, trash: faTrash, star: faStar };

  get boxShadow(): string {
    const shadowColors: Record<string, string> = {
      model1: '#154580',
      model2: '#6BD1FF',
      model3: '#84EEC1',
    };
    return shadowColors[this.thinking.model]
      ? `8px 8px 0px ${shadowColors[this.thinking.model]}`
      : 'none';
  }
  delete(id: number, event: Event) {
    event.stopPropagation();
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.service.delete(id).subscribe(() => {
          this.loadList.emit()
        });
      });
  }

  changeFavoriteIcon(): string {
    this.thinking.favorite = !this.thinking.favorite;
    return this.thinking.favorite ? 'fas' : 'far';
  }

  toggleFavorite() {
    this.service.changeFavorite(this.thinking).subscribe()
    this.loadList.emit()
  }
}
