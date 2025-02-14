import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditThoughtComponent } from './edit-thought.component';
import { ThinkingService } from '../../services/thinking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

class MockThinkingService {
  findById = jasmine
    .createSpy('findById')
    .and.returnValue(
      of({ id: 1, auth: 'Autor', content: 'Conteúdo', model: 'model1' })
    );
  edit = jasmine.createSpy('edit').and.returnValue(of(null));
}

describe('EditThoughtComponent', () => {
  let component: EditThoughtComponent;
  let fixture: ComponentFixture<EditThoughtComponent>;
  let mockThinkingService: MockThinkingService;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    mockThinkingService = new MockThinkingService();

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, EditThoughtComponent],
      providers: [
        FormBuilder,
        { provide: ThinkingService, useValue: mockThinkingService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must search a thought by ID at startup and populate the form', () => {
    expect(mockThinkingService.findById).toHaveBeenCalledWith(1);
    fixture.detectChanges()
    expect(component.form.value).toEqual({
      id: 1,
      auth: 'Autor',
      content: 'Conteúdo',
      model: 'model1',
     
    });
  });

  it('must call the service to edit a thought and redirect', () => {
    component.editThink();
    expect(mockThinkingService.edit).toHaveBeenCalledWith(component.form.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('must redirect when canceling', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should disable the button when form is invalid', () => {
    component.form.controls['content'].setValue('');
    expect(component.enableButton()).toBe('disabled');
  });

  
});
