import {browser, by, element} from 'protractor';

export class AngularSrcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rts-accueil h1')).getText();
  }
}
