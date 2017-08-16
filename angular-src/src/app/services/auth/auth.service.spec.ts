import { TestBed, inject } from '@angular/core/testing';
import {Http} from '@angular/http'
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        Http
      ],
      declarations: [
        AuthService
      ],
    });
  });

  xit('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
