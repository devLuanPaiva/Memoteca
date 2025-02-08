import { Component, Input } from '@angular/core';
import { Thinking } from '../../../interfaces/thinking';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ThinkingService } from '../../../services/thinking.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-thought',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './thought.component.html',
  providers: [ConfirmationService, MessageService] 
})
export class ThoughtComponent {
  @Input() thinking: Thinking = {
    id: 0,
    content: 'I love Angular',
    auth: 'Luan',
    model: 'model1',
  };
  constructor(
    private readonly service: ThinkingService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}
  icons = { edit: faEdit, trash: faTrash };

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
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja excluir este pensamento?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.service.delete(id).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirm',
            detail: 'Pensamento deletado com sucesso',
          });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Cancelado com sucesso',
        });
      },
    });

  }
}
