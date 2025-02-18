import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ThinkingService } from './thinking.service';
import { Thinking } from '../interfaces/thinking';
import { environment } from '../../environments/environment';

describe('ThinkingService', () => {
  let service: ThinkingService;
  let httpMock: HttpTestingController;
  const API = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThinkingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ThinkingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a paginated list of thinkings with filters', () => {
    const mockThinkings: Thinking[] = [
      { id: 1, content: 'Test 1', auth: '', model: '', favorite: false },
      { id: 2, content: 'Test 2', auth: '', model: '', favorite: true },
    ];

    service.list(1, 'Test', true).subscribe((thinkings) => {
      expect(thinkings.length).toBe(2);
      expect(thinkings).toEqual(mockThinkings);
    });

    const req = httpMock.expectOne(`${API}/thinkings?page=1&limit=10&filter=Test&favorite=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mockThinkings);
  });

  it('should create a new thinking', () => {
    const newThinking: Thinking = { id: 3, content: 'New Thinking', auth: '', model: '', favorite: false };

    service.create(newThinking).subscribe((thinking) => {
      expect(thinking).toEqual(newThinking);
    });

    const req = httpMock.expectOne(`${API}/thinkings`);
    expect(req.request.method).toBe('POST');
    req.flush(newThinking);
  });

  it('should edit an existing thinking', () => {
    const updatedThinking: Thinking = { id: 1, content: 'Updated Content', auth: '', model: '', favorite: false };

    service.edit(updatedThinking).subscribe((thinking) => {
      expect(thinking).toEqual(updatedThinking);
    });

    const req = httpMock.expectOne(`${API}/thinkings/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedThinking);
  });

  it('should toggle favorite status of a thinking', () => {
    const thinking: Thinking = { id: 1, content: 'Favorite Toggle', auth: '', model: '', favorite: false };
    const updatedThinking = { ...thinking, favorite: true };

    service.changeFavorite(thinking).subscribe((result) => {
      expect(result.favorite).toBe(true);
    });

    const req = httpMock.expectOne(`${API}/thinkings/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedThinking);
  });

  it('should delete a thinking by id', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${API}/thinkings/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should find a thinking by id', () => {
    const mockThinking: Thinking = { id: 1, content: 'Find Me', auth: '', model: '', favorite: false };

    service.findById(1).subscribe((thinking) => {
      expect(thinking).toEqual(mockThinking);
    });

    const req = httpMock.expectOne(`${API}/thinkings/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockThinking);
  });
});
