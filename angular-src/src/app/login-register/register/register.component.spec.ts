import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../services/auth/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        FlashMessagesModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule
      ],
      // providers: [
      //   AuthService
      // ]
    })
    // .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
