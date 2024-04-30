import Page from '../templates/page';

class ErrorPage extends Page {
  h1: HTMLHeadingElement;

  private errorType: string;

  static TextObject: { [key: string]: string } = {
    404: 'Page not found',
  };

  constructor(id: string, errorType: string) {
    super(id);

    this.errorType = errorType;

    this.h1 = document.createElement('h1');
  }

  render() {
    this.h1.innerText = ErrorPage.TextObject[this.errorType];
    this.container.append(this.h1);
    return this.container;
  }
}

export default ErrorPage;
