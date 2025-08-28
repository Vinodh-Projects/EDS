import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const accordionSections = [];
  const wrapper = document.createElement('div');

  [...block.children].forEach((row, index) => {
    const columns = [...row.children];
    const header = document.createElement('button');
    const content = document.createElement('div');

    header.className = 'accordion-header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `accordion-content-${index}`);
    header.innerHTML = columns[0].innerHTML;

    content.className = 'accordion-content';
    content.id = `accordion-content-${index}`;
    content.setAttribute('aria-hidden', 'true');
    content.innerHTML = columns[1] ? columns[1].innerHTML : '';

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      accordionSections.forEach(section => {
        section.header.setAttribute('aria-expanded', 'false');
        section.content.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
    });

    accordionSections.push({ header, content });
    wrapper.append(header, content);
  });

  block.textContent = '';
  block.append(wrapper);
}