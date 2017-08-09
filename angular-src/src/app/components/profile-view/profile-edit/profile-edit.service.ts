import { Injectable, EventEmitter } from '@angular/core';

import { CitiesClass } from './list-cities';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileEditService {

  age = new EventEmitter<Number>();
  private _age = new Subject<Number>();
  age$ = this._age.asObservable();

  save = new EventEmitter<any>();
  private _save = new Subject<any>();
  save$ = this._save.asObservable();

  public countriesList: CitiesClass[];

  constructor() {
    this.countriesList = [];
  }


  initListCountries(initialCountriesList: any[]) {
    this.countriesList = initialCountriesList;
  }

  addVisitedCountry(country) {
    this.countriesList.push(country);

    // this.newVisitedCountry = '';
  }

  removeVisitedCountry(country) {
    const index: number = this.countriesList.indexOf(country);
    if (index !== -1) {
      this.countriesList.splice(index, 1);
    }
  }

  getallCities(): CitiesClass[] {
    return this.countriesList;
  }

  /**
   * Calcul l'age de l'utilisateur
   * @param birthdate date de naissance
   */
  calcAge(birthdate: Date): any {
    let userAge: Number;
    const userDateBirth = new Date(birthdate)

    const ageDifMs = Date.now() - userDateBirth.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch

    userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    // this.age.emit(userAge);
    this._age.next(userAge);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getAge(): Observable<Number> {
    return this._age.asObservable();
  }

  onSaveEvent(status: Boolean) {
    this._save.next(status);
  }

  getSaveStatus(): Observable<any> {
    return this._save.asObservable();
  }
}
