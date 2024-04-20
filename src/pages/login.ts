import Page from '../templates/page';

const handleInvalidInput = (event: Event) => {
  const regex = /^[A-Z][a-zA-Z-]{2,}(?<!-)$/;
  if (event.target instanceof HTMLInputElement) {
    if (!regex.test(event.target.value)) {
      event.target.classList.add('login-input_invalid');
    } else {
      event.target.classList.remove('login-input_invalid');
    }
  }
};

const createInputOrLabelElement = (
  elementToCreate: FormElement,
): HTMLInputElement | HTMLLabelElement => {
  const element = document.createElement(elementToCreate.type) as
    | HTMLInputElement
    | HTMLLabelElement;
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

const createHeading = (elementToCreate: FormElement): HTMLHeadingElement => {
  const header = document.createElement(elementToCreate.type) as HTMLHeadingElement;
  header.id = elementToCreate.id;
  header.className = elementToCreate.className;
  if (elementToCreate.text) header.innerText = elementToCreate.text;
  return header;
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
    };

    this.h1 = createHeading(this.elements.header);
  }

  render() {
    const h2 = createHeading(this.elements.loginHeading);

    const nameContainer = createContainerElement('input-container');
    const surnameContainer = createContainerElement('input-container');
    const nameLabel = createInputOrLabelElement(
      this.elements.firstNameLabel,
    ) as HTMLLabelElement;

    const nameInput = createInputOrLabelElement(
      this.elements.firstNameInput,
    ) as HTMLInputElement;
    nameInput.addEventListener('input', handleInvalidInput);

    const surnameLabel = createInputOrLabelElement(
      this.elements.surnameLabel,
    ) as HTMLLabelElement;

    const surnameInput = createInputOrLabelElement(
      this.elements.surnameInput,
    ) as HTMLInputElement;
    surnameInput.addEventListener('input', handleInvalidInput);

    nameContainer.append(nameLabel, nameInput);
    surnameContainer.append(surnameLabel, surnameInput);

    this.form.append(h2);
    this.form.append(nameContainer, surnameContainer);

    this.container.append(this.form);
    this.main.append(this.h1);
    this.main.append(this.container);
    return this.main;
  }
}

export default LoginPage;
