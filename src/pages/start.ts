import Page from '../templates/page';

class StartPage extends Page {
  h1: HTMLHeadingElement;

  static TextObject = {
    MainTitle: 'Start',
  };

  constructor(id: string) {
    super(id);
    this.h1 = document.createElement('h1');
    this.h1.innerText = StartPage.TextObject.MainTitle;
  }

  render() {
    this.container.append(this.h1);
    return this.container;
  }
}

export default StartPage;
