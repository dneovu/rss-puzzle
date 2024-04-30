import { Element } from '../types/element';
import { createElement } from '../utils/createElement';
import { PageIds } from '../constants/constants';
import Page from '../templates/page';

export class LoginPage extends Page {
  h1: HTMLHeadingElement;

  private main: HTMLElement;

  private form: HTMLFormElement;

  private static elements: Record<string, Element> = {
    header: {
      type: 'h1',
      className: 'login-h1',
      text: 'ENGLISH PUZZLE',
    },
    loginHeading: {
      type: 'h2',
      className: 'login-h2',
      text: 'Login',
    },
    firstNameLabel: {
      type: 'label',
      className: 'login-label',
      text: 'First Name',
    },
    firstNameInput: {
      type: 'input',
      className: 'login-input',
    },
    surnameLabel: {
      type: 'label',
      className: 'login-label',
      text: 'Surname',
    },
    surnameInput: {
      type: 'input',
      className: 'login-input',
    },
    loginButton: {
      type: 'button',
      className: 'login-button',
      text: 'Login',
    },
    main: {
      type: 'main',
      className: 'login-main',
    },
    form: {
      type: 'form',
      className: 'login-form',
    },
    nameContainer: {
      type: 'div',
      className: 'input-container',
    },
  };

  constructor(id: string) {
    super(id);

    this.main = createElement(LoginPage.elements.main);
    this.form = createElement(LoginPage.elements.form);
    this.h1 = createElement(LoginPage.elements.header);
  }

  render() {
    const h2 = createElement<HTMLHeadingElement>(
      LoginPage.elements.loginHeading,
    );

    const nameContainer = createElement(LoginPage.elements.nameContainer);
    const surnameContainer = createElement(LoginPage.elements.nameContainer);

    const nameLabel = createElement(LoginPage.elements.firstNameLabel);
    const nameInput = createElement(LoginPage.elements.firstNameInput);

    const surnameLabel = createElement(LoginPage.elements.surnameLabel);
    const surnameInput = createElement(LoginPage.elements.surnameInput);

    nameContainer.append(nameLabel, nameInput);
    surnameContainer.append(surnameLabel, surnameInput);

    const loginButton = createElement(LoginPage.elements.loginButton);
    loginButton.addEventListener('click', LoginPage.handleLoginButtonClick);

    this.form.append(h2, nameContainer, surnameContainer, loginButton);

    this.form.addEventListener('input', LoginPage.handleInputAndFocus);
    this.form.addEventListener('focusin', LoginPage.handleInputAndFocus);
    this.form.addEventListener('focusout', LoginPage.handleInputAndFocus);

    this.main.append(this.form);
    this.container.append(this.h1, this.main);

    return this.container;
  }

  private static isInputValid(input: HTMLInputElement): boolean {
    const regex = /^[A-Z][a-zA-Z-]{2,}(?<!-)$/;
    return regex.test(input?.value);
  }

  private static handleInvalidInput(target: EventTarget): void {
    if (target instanceof HTMLInputElement) {
      const isValid = LoginPage.isInputValid(target as HTMLInputElement);
      if (isValid) {
        target.classList.remove('login-input_invalid');
        target.classList.add('login-input_valid');
      } else {
        target.classList.add('login-input_invalid');
        target.classList.remove('login-input_valid');
      }
    }
  }

  private static handleInputAndFocus(event: Event): void {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      LoginPage.handleInvalidInput(target);
      const label = target.parentNode?.children.item(0);
      if (event.type === 'focusin') {
        label?.classList.add('login-label_focus');
      } else if (event.type === 'focusout' && target.value === '') {
        label?.classList.remove('login-label_focus');
      }
    }
  }

  private static handleLoginButtonClick(event: Event): void {
    event.preventDefault();
    const { target } = event;
    if (target instanceof HTMLButtonElement) {
      const firstNameInput = document.getElementById(
        'login-name-input',
      ) as HTMLInputElement;
      const surnameInput = document.getElementById(
        'login-surname-input',
      ) as HTMLInputElement;
      const isNameValid = LoginPage.isInputValid(firstNameInput);
      const isSurnameValid = LoginPage.isInputValid(surnameInput);

      if (isNameValid && isSurnameValid) {
        window.location.href = `#${PageIds.startPage}`;

        localStorage.setItem(
          'userFullName',
          JSON.stringify({
            firstName: firstNameInput.value,
            surname: surnameInput.value,
          }),
        );
      } else if (!isNameValid && !isSurnameValid) {
        alert('Name and surname are invalid');
      } else if (!isNameValid) {
        alert('Name invalid');
      } else if (!isSurnameValid) {
        alert('Surname invalid');
      }
    }
  }
}

export default LoginPage;
