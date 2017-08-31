import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { TopMenuComponent } from './top-menu.component';


describe('TopMenuComponent', () => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;

  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [TopMenuComponent],
      providers: [
        AuthService,
        Router,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // de = fixture.debugElement.query(By.css('li:first-child'));
    // el = de.nativeElement;
  });


  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
  xit('should Contain "Accueil" link', () => {
    de = fixture.debugElement.query(By.css('li:first-child'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Accueil');
  });
});
