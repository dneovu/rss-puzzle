import Page from '../../templates/page';
import StartPage from '../start';
import ErrorPage from '../error';
import { LoginPage } from '../login';
import { PageIds, StorageKeys } from '../../constants/constants';

class App {
  private static container: HTMLElement = document.body;

  private initPage: LoginPage;

  static renderNewPage(pageId: string) {
    let page: Page | null = null;
    if (pageId === PageIds.loginPage || !localStorage.getItem(StorageKeys.userFullName)) {
      window.location.href = `#${PageIds.loginPage}`;
      page = new LoginPage(PageIds.loginPage);
    } else if (pageId === PageIds.startPage) {
      page = new StartPage(pageId);
    } else {
      page = new ErrorPage(pageId, '404');
    }

    App.container.innerHTML = '';

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
    const hash = window.location.hash.slice(1);
    if (hash) {
      App.renderNewPage(hash);
    } else {
      App.renderNewPage(PageIds.loginPage);
    }

    App.enableRouteChange();
  }
}

export default App;
