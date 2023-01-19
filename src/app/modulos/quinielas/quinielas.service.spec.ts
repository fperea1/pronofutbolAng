import { TestBed } from '@angular/core/testing';

import { QuinielasService } from './quinielas.service';

describe('QuinielasService', () => {
  let service: QuinielasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuinielasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
