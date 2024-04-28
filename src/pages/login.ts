import Page from '../templates/page';

const isInputValid = (input: HTMLInputElement) => {
  const regex = /^[A-Z][a-zA-Z-]{2,}(?<!-)$/;
  return regex.test(input?.value);
};

const handleInvalidInput = (target: EventTarget) => {
  if (target instanceof HTMLInputElement) {
    const isValid = isInputValid(target as HTMLInputElement);
    if (isValid) {
      target.classList.remove('login-input_invalid');
      target.classList.add('login-input_valid');
    } else {
      target.classList.add('login-input_invalid');
      target.classList.remove('login-input_valid');
    }
  }
};

const handleInputAndFocus = (event: Event) => {
  const { target } = event;

  if (target instanceof HTMLInputElement) {
    handleInvalidInput(target);
    const label = target.parentNode?.children.item(0);

    if (event.type === 'focusin') {
      label?.classList.add('login-label_focus');
    } else if (event.type === 'focusout' && target.value === '') {
      label?.classList.remove('login-label_focus');
    }
  }
};

const handleLoginButtonClick = (event: Event) => {
  event.preventDefault();

  const { target } = event;

  if (target instanceof HTMLButtonElement) {
    const firstNameInput = document.getElementById(
      'login-name-input',
    ) as HTMLInputElement;
    const surnameInput = document.getElementById(
      'login-surname-input',
    ) as HTMLInputElement;
    const isNameValid = isInputValid(firstNameInput);
    const isSurnameValid = isInputValid(surnameInput);

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
};

const createElement = <T extends HTMLElement>(elementToCreate: FormElement): T => {
  const element = document.createElement(elementToCreate.type) as T;
  element.id = elementToCreate.id;
  element.className = elementToCreate.className;
  if (elementToCreate.text) element.innerText = elementToCreate.text;
  return element;
};

const createContainerElement = (className: string): HTMLDivElement => {
  const container = document.createElement('div');
  container.className = className;
  return container;
};

type FormElement = {
  type: string;
  id: string;
  className: string;
  text?: string;
};

export class LoginPage extends Page {
  h1: HTMLHeadingElement;

  main: HTMLElement;

  container: HTMLDivElement;

  private form: HTMLFormElement;

  private elements: Record<string, FormElement>;

  constructor() {
    super();
    document.body.className = 'login-body';

    this.main = document.createElement('main');
    this.main.className = 'login-main';

    this.container = createContainerElement('login-container');

    this.form = document.createElement('form');
    this.form.className = 'form-container';

    this.elements = {
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

    this.h1 = createElement<HTMLHeadingElement>(this.elements.header);
  }

  render() {
    const h2 = createElement<HTMLHeadingElement>(this.elements.loginHeading);

    const nameContainer = createContainerElement('input-container');
    const surnameContainer = createContainerElement('input-container');

    const nameLabel = createElement<HTMLLabelElement>(this.elements.firstNameLabel);
    const nameInput = createElement<HTMLInputElement>(this.elements.firstNameInput);

    const surnameLabel = createElement<HTMLLabelElement>(this.elements.surnameLabel);
    const surnameInput = createElement<HTMLInputElement>(this.elements.surnameInput);

    nameContainer.append(nameLabel, nameInput);
    surnameContainer.append(surnameLabel, surnameInput);

    const loginButton = createElement<HTMLButtonElement>(this.elements.loginButton);
    loginButton.addEventListener('click', handleLoginButtonClick);

    this.form.append(h2, nameContainer, surnameContainer, loginButton);

    this.form.addEventListener('input', handleInputAndFocus);
    this.form.addEventListener('focusin', handleInputAndFocus);
    this.form.addEventListener('focusout', handleInputAndFocus);

    this.container.append(this.form);
    this.main.append(this.h1, this.container);

    return this.main;
  }
}

export default LoginPage;
