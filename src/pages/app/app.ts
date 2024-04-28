import Page from '../../templates/page';
import StartPage from '../start';
import { LoginPage } from '../login';
import { PageIds } from '../../constants/constants';

class App {
  private static container: HTMLElement = document.body;

  private initPage: LoginPage;

  static renderNewPage(pageId: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (pageId === PageIds.loginPage) {
      page = new LoginPage(pageId);
    } else if (pageId === PageIds.startPage) {
      page = new StartPage(pageId);
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  private static enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.initPage = new LoginPage('login');
  }

  static run() {
    App.renderNewPage(PageIds.loginPage);
    App.enableRouteChange();
  }
}

export default App;
