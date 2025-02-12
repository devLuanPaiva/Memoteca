import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThinkingService } from '../../services/thinking.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thought-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './thought-form.component.html',
})
export class ThoughtFormComponent implements OnInit {
  thinking!: FormGroup

  constructor(
    private readonly thinkingService: ThinkingService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.thinking = this.formBuilder.group({
      content: [''],
      auth: [''],
      model: ['model1'],
    });
  }

  createThink() {
    this.thinkingService.create(this.thinking.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  cancel() {
    this.router.navigate(['/']);
  }
}
