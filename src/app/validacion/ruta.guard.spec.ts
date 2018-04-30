import { TestBed, async, inject } from '@angular/core/testing';

import { RutaGuard } from './ruta.guard';

describe('RutaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutaGuard]
    });
  });

  it('should ...', inject([RutaGuard], (guard: RutaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
