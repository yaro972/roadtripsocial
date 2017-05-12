import { RoadtripsocialPage } from './app.po';

describe('roadtripsocial App', () => {
  let page: RoadtripsocialPage;

  beforeEach(() => {
    page = new RoadtripsocialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
