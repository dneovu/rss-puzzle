type FormElement = {
  type: string;
  id: string;
  className: string;
  text?: string;
};

export class LoginPage {
  main: HTMLElement;

  container: HTMLDivElement;

  private form: HTMLFormElement;

  private elements: FormElement[];

  constructor() {
    document.body.className = 'login-body';

    this.main = document.createElement('main');
    this.main.className = 'login-main';

    this.container = document.createElement('div');
    this.container.className = 'login-container';

    this.form = document.createElement('form');
    this.form.className = 'form-container';

    this.elements = [
      {
        type: 'h2',
        id: 'login-h2',
        className: 'login-h2',
        text: 'Login',
      },
      { type: 'input', id: 'login-name-input', className: 'login-input' },
      { type: 'input', id: 'login-surname-input', className: 'login-input' },
    ];

    this.elements.forEach((element) => this.createFormElement(element));
  }

  private createFormElement(elementToCreate: FormElement): void {
    const element = document.createElement(elementToCreate.type) as
      | HTMLHeadingElement
      | HTMLInputElement;

    element.id = elementToCreate.id;
    element.className = elementToCreate.className;

    if (elementToCreate.text !== undefined) {
      element.innerText = elementToCreate.text;
    }
    if (elementToCreate.type === 'input') {
      element.addEventListener('input', () => {});
      this.form.appendChild(element);
    } else if (elementToCreate.type === 'h2') {
      this.container.append(element);
    }
  }

  createHeader(): void {
    const header = document.createElement('h1');
    header.innerText = 'ENGLISH PUZZLE';
    this.main.append(header);
  }

  render() {
    this.createHeader();
    this.container.append(this.form);
    this.main.append(this.container);
    document.body.append(this.main);
  }
}

export default LoginPage;
