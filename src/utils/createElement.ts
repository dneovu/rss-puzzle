import { Element } from '../types/element';

export const createElement = <T extends HTMLElement>(elementToCreate: Element): T => {
  const element = document.createElement(elementToCreate.type) as T;
  element.className = elementToCreate.className;
  if (elementToCreate.text) element.innerText = elementToCreate.text;
  if (elementToCreate.id) element.id = elementToCreate.id;
  return element;
};

export default createElement;
