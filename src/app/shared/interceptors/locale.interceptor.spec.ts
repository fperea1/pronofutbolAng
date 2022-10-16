import { TestBed } from '@angular/core/testing';

import { LocaleInterceptor } from './locale.interceptor';

describe('LocaleInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LocaleInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LocaleInterceptor = TestBed.inject(LocaleInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
