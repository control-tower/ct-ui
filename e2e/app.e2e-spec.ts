import { CtUiPage } from './app.po';

describe('ct-ui App', function() {
  let page: CtUiPage;

  beforeEach(() => {
    page = new CtUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
