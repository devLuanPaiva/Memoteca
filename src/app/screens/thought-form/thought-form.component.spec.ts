import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThoughtFormComponent } from './thought-form.component';
import { ThinkingService } from '../../services/thinking.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Thinking } from '../../interfaces/thinking';

describe('ThoughtFormComponent', () => {
  let component: ThoughtFormComponent;
  let fixture: ComponentFixture<ThoughtFormComponent>;
  let mockThinkingService: jasmine.SpyObj<ThinkingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockThinkingService = jasmine.createSpyObj('ThinkingService', ['create']);
    mockThinkingService.create.and.returnValue(of<Thinking>({ id: 1, auth: '', content: '', model: '', favorite: false }));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, ThoughtFormComponent],
      providers: [
        FormBuilder,
        { provide: ThinkingService, useValue: mockThinkingService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThoughtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({
      content: '',
      auth: '',
      model: 'model1',
      favorite: false
    });
  });
  it('should update thinking.content when user types in textarea', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('#pensamento');
    textarea.value = 'Novo pensamento!';
    textarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.get('content')?.value).toBe('Novo pensamento!');
  });
  it('should update thinking.auth when user types in input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#autoria');
    input.value = 'Autor Exemplo';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.get('auth')?.value).toBe('Autor Exemplo');
  });
  it('should call create() and navigate on createThink() when form is valid', () => {
    component.form.setValue({
      content: 'Pensamento Teste',
      auth: 'Autor Teste',
      model: 'model1',
      favorite: true
    });
    component.createThink();
    expect(mockThinkingService.create).toHaveBeenCalledWith(component.form.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should mark all fields as touched if form is invalid on createThink()', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.createThink();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });

  it('should navigate to home when cancel() is called', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update form model value when user selects a model', () => {
    component.form.controls['model'].setValue('model2');
    fixture.detectChanges();
    expect(component.form.value.model).toBe('model2');
  });
});
