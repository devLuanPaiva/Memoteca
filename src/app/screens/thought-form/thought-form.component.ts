import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThinkingService } from '../../services/thinking.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thought-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './thought-form.component.html',
})
export class ThoughtFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly thinkingService: ThinkingService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      auth: ['', [Validators.required, Validators.minLength(3)]],
      model: ['model1', [Validators.required]]
    });
  }

  createThink() {
    if (this.form.valid) {
      this.thinkingService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
