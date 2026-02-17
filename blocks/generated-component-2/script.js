import { createOptimizedPicture } from '../../scripts/aem.js';
export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const slides = [...block.children].map((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('data-index', index);

    const columns = [...row.children];
    const imgElement = columns[0].querySelector('picture') || columns[0].querySelector('img');
    const imgSrc = imgElement.querySelector('img') ? imgElement.querySelector('img').src : imgElement.src;

    const picture = createOptimizedPicture(imgSrc);
    slide.append(picture);

    if (columns.length > 1) {
      const textSection = document.createElement('div');
      textSection.className = 'carousel-text';
      textSection.innerHTML = columns[1].innerHTML;
      slide.append(textSection);
    }

    return slide;
  });

  slides.forEach(slide => wrapper.append(slide));

  const nav = document.createElement('div');
  nav.className = 'carousel-nav';
  slides.forEach((slide, i) => {
    const button = document.createElement('button');
    button.className = 'carousel-dot';
    button.setAttribute('data-index', i);
    button.addEventListener('click', () => {
      wrapper.style.transform = `translateX(-${i * 100}%)`;
    });
    nav.append(button);
  });

  block.textContent = '';
  block.append(wrapper, nav);
}