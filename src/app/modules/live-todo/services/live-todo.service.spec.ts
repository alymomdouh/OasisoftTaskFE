import { TestBed } from '@angular/core/testing';

import { LiveTodoService } from './live-todo.service';

describe('LiveTodoService', () => {
  let service: LiveTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
