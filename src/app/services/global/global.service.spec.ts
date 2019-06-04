import { TestBed, inject } from '@angular/core/testing';

import { GLOBAL } from './global.service';

describe('GlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GLOBAL]
    });
  });

  it('should be created', inject([GLOBAL], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));
});
