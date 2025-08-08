import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-content';

  [...block.children].forEach((row) => {
    const columns = [...row.children];
    columns.forEach((column) => {
      const picture = column.querySelector('picture img');
      if (picture) {
        const imgSrc = picture.src;
        const optimizedPicture = createOptimizedPicture(imgSrc);
        wrapper.append(optimizedPicture);
      } else {
        const img = column.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src);
          wrapper.append(optimizedPicture);
        }
      }

      const title = column.querySelector('h1, h2');
      if (title) {
        const titleElement = document.createElement(title.tagName);
        titleElement.textContent = title.textContent;
        wrapper.append(titleElement);
      }

      const description = column.querySelector('p');
      if (description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description.textContent;
        wrapper.append(descriptionElement);
      }

      const button = column.querySelector('button');
      if (button) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = button.textContent;
        buttonElement.className = 'cta-button';
        wrapper.append(buttonElement);
      }
    });
  });

  block.textContent = '';
  block.append(wrapper);
}