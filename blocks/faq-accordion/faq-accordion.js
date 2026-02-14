// Fixed lint errors: arrow-parens, no-use-before-define, and eol-last

export default function decorate(block) {
  // Extract content from block's children (table rows)
  const rows = Array.from(block.children);
  const data = rows.map((row) => Array.from(row.children).map((cell) => cell.textContent.trim()));

  // Clear the block content
  block.innerHTML = '';

  // Create the wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'faq-accordion';

  // Extract data
  const [title, subtitle, ...rest] = data[0];
  const buttons = rest.slice(0, 6);
  const faqs = rest.slice(6);

  // Create and append title
  const titleElement = document.createElement('h2');
  titleElement.className = 'faq-accordion-title';
  titleElement.textContent = title;
  wrapper.appendChild(titleElement);

  // Create and append subtitle
  const subtitleElement = document.createElement('p');
  subtitleElement.className = 'faq-accordion-subtitle';
  subtitleElement.textContent = subtitle;
  wrapper.appendChild(subtitleElement);

  // Create and append navigation buttons
  const nav = document.createElement('div');
  nav.className = 'faq-accordion-navigation';
  for (let i = 0; i < buttons.length; i += 2) {
    const button = document.createElement('a');
    button.className = 'faq-accordion-button';
    button.href = buttons[i + 1];
    button.textContent = buttons[i];
    nav.appendChild(button);
  }
  wrapper.appendChild(nav);

  // Create and append FAQ list
  const faqList = document.createElement('ul');
  faqList.className = 'faq-accordion-list';
  for (let i = 0; i < faqs.length; i += 2) {
    const faqItem = document.createElement('li');
    faqItem.className = 'faq-accordion-item';

    const question = document.createElement('div');
    question.className = 'faq-accordion-question';
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    question.textContent = faqs[i];

    const answer = document.createElement('div');
    answer.className = 'faq-accordion-answer';
    answer.textContent = faqs[i + 1];
    answer.style.display = i === 0 ? 'block' : 'none';

    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', !isExpanded);
      answer.style.display = isExpanded ? 'none' : 'block';
    });

    faqItem.appendChild(question);
    faqItem.appendChild(answer);
    faqList.appendChild(faqItem);
  }
  wrapper.appendChild(faqList);

  // Append the wrapper to the block
  block.appendChild(wrapper);
}
