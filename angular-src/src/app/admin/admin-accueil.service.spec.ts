import { TestBed, inject } from '@angular/core/testing';

import { AdminAccueilService } from './admin-accueil.service';

describe('AdminAccueilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAccueilService]
    });
  });

  it('should be created', inject([AdminAccueilService], (service: AdminAccueilService) => {
    expect(service).toBeTruthy();
  }));
});
