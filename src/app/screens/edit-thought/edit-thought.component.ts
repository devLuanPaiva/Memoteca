import { Component, OnInit } from '@angular/core';
import { Thinking } from '../../interfaces/thinking';
import { ActivatedRoute, Router } from '@angular/router';
import { ThinkingService } from '../../services/thinking.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-thought',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-thought.component.html',
})
export class EditThoughtComponent implements OnInit {
  form!: FormGroup

  constructor(
    private readonly thoughtService: ThinkingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      content: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      auth: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      model: ['', Validators.required]
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.thoughtService.findById(parseInt(id)).subscribe((thinking: Thinking) => {
        this.form.patchValue(thinking);
      });
    }
  }

  editThink() {
    this.thoughtService.edit(this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  cancel() {
    this.router.navigate(['/']);
  }
  enableButton(): string {
    if (this.form.invalid) {
      return 'disabled'
    }
    return ''
  }
}
