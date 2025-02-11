import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThoughtFormComponent } from './thought-form.component';
import { ThinkingService } from '../../services/thinking.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    mockThinkingService.create.and.returnValue(of<Thinking>({ id: 1, auth: '', content: '', model: '' }));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ThoughtFormComponent],
      providers: [
        { provide: ThinkingService, useValue: mockThinkingService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThoughtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should update thinking.content when user types in textarea', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('#pensamento');
    textarea.value = 'Novo pensamento!';
    textarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.thinking.content).toBe('Novo pensamento!');
  });
  it('should update thinking.auth when user types in input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#autoria');
    input.value = 'Autor Exemplo';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.thinking.auth).toBe('Autor Exemplo');
  });
  it('should call create() and navigate on createThink()', () => {
    component.thinking = {
      content: 'Pensamento Teste',
      auth: 'Autor Teste',
      model: 'model1'
    };

    component.createThink();

    expect(mockThinkingService.create).toHaveBeenCalledWith(component.thinking);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
  it('should navigate to home when cancel() is called', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
})
