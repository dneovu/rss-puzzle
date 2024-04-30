import { Element } from '../types/element';
import Page from '../templates/page';
import { createElement } from '../utils/createElement';
import { StorageKeys } from '../constants/constants';

class StartPage extends Page {
  h1: HTMLHeadingElement;

  private static elements: Record<string, Element> = {
    header: {
      type: 'h1',
      className: 'start-h1',
      text: 'WELCOME',
    },
    fullName: {
      type: 'p',
      className: 'start-fullname',
    },
    startButton: {
      type: 'button',
      className: 'start-button',
      text: 'Start',
    },
  };

  constructor(id: string) {
    super(id);

    this.h1 = createElement(StartPage.elements.header);
  }

  render() {
    const fullName = createElement(StartPage.elements.fullName);
    const storedData = localStorage.getItem(StorageKeys.userFullName);
    if (storedData) {
      const userData = JSON.parse(storedData);
      fullName.innerText = `${userData.firstName} ${userData.surname}`;
    } else {
      console.log("No data found in localStorage for key 'userFullName'");
    }

    const startButton = createElement(StartPage.elements.startButton);
    startButton.addEventListener('click', () => {});
    this.container.append(this.h1, fullName, startButton);
    return this.container;
  }
}

export default StartPage;
