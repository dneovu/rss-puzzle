abstract class Page {
  abstract h1: HTMLHeadingElement;

  abstract main: HTMLElement;

  abstract render(): HTMLElement;
}

export default Page;
