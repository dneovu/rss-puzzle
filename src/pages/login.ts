import Page from '../templates/page';

type FormElement = {
  type: string;
  id: string;
  className: string;
  text?: string;
};

export class LoginPage extends Page {
  h1: HTMLHeadingElement;

  private main: HTMLElement;

  private form: HTMLFormElement;

  private static elements: Record<string, FormElement> = {
    header: {
      id: 'h1',
      type: 'h1',
      className: 'login-h1',
      text: 'ENGLISH PUZZLE',
    },
    loginHeading: {
      id: 'login-h2',
      type: 'h2',
      className: 'login-h2',
      text: 'Login',
    },
    firstNameLabel: {
      id: 'login-name-label',
      type: 'label',
      className: 'login-label',
      text: 'First Name',
    },
    firstNameInput: {
      id: 'login-name-input',
      type: 'input',
      className: 'login-input',
    },
    surnameLabel: {
      id: 'login-surname-label',
      type: 'label',
      className: 'login-label',
      text: 'Surname',
    },
    surnameInput: {
      id: 'login-surname-input',
      type: 'input',
      className: 'login-input',
    },
    loginButton: {
      id: 'login-button',
      type: 'button',
      className: 'login-button',
      text: 'Login',
    },
  };

  constructor(id: string) {
    super(id);
    this.main = document.createElement('main');
    this.main.className = 'login-main';

    this.form = document.createElement('form');
    this.form.className = 'login-form';

    this.h1 = LoginPage.createElement<HTMLHeadingElement>(LoginPage.elements.header);
  }

  render() {
    const h2 = LoginPage.createElement<HTMLHeadingElement>(
      LoginPage.elements.loginHeading,
    );

    const nameContainer = LoginPage.createContainerElement('input-container');
    const surnameContainer = LoginPage.createContainerElement('input-container');

    const nameLabel = LoginPage.createElement<HTMLLabelElement>(
      LoginPage.elements.firstNameLabel,
    );
    const nameInput = LoginPage.createElement<HTMLInputElement>(
      LoginPage.elements.firstNameInput,
    );

    const surnameLabel = LoginPage.createElement<HTMLLabelElement>(
      LoginPage.elements.surnameLabel,
    );
    const surnameInput = LoginPage.createElement<HTMLInputElement>(
      LoginPage.elements.surnameInput,
    );

    nameContainer.append(nameLabel, nameInput);
    surnameContainer.append(surnameLabel, surnameInput);

    const loginButton = LoginPage.createElement<HTMLButtonElement>(
      LoginPage.elements.loginButton,
    );
    loginButton.addEventListener('click', LoginPage.handleLoginButtonClick);

    this.form.append(h2, nameContainer, surnameContainer, loginButton);

    this.form.addEventListener('input', LoginPage.handleInputAndFocus);
    this.form.addEventListener('focusin', LoginPage.handleInputAndFocus);
    this.form.addEventListener('focusout', LoginPage.handleInputAndFocus);

    this.main.append(this.form);
    this.container.append(this.h1, this.main);

    return this.container;
  }

  private static createElement<T extends HTMLElement>(elementToCreate: FormElement): T {
    const element = document.createElement(elementToCreate.type) as T;
    element.id = elementToCreate.id;
    element.className = elementToCreate.className;
    if (elementToCreate.text) element.innerText = elementToCreate.text;
    return element;
  }

  private static createContainerElement(className: string): HTMLDivElement {
    const container = document.createElement('div');
    container.className = className;
    return container;
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
