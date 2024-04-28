abstract class Page {
  abstract h1: HTMLHeadingElement;

  protected container: HTMLElement;

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  render() {
    return this.container;
  }
}

export default Page;
