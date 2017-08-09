import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
// import { ValidateLoginService } from './validate-login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        // AuthService
      ]
    }).compileComponents();
  }));

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [LoginComponent]
  //   })
  //     .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });

  xit('Should show label "Identifiant"', () => {
    de = fixture.debugElement.query(By.css('label:first-child'));
    el = de.nativeElement;

    expect(el.textContent).toContain('Identifiant');
  });
});
