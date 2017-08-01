import { CtUiPage } from './app.po';

describe('ct-ui App', () => {
  let page: CtUiPage;

  beforeEach(() => {
    page = new CtUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
