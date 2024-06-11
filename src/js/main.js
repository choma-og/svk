
import '@/styles/style.scss';
import gsap from 'gsap';


const burgerButton = document.querySelector('.js-burger');
const menuSection = document.querySelector('.js-menu');
const closeButton = document.querySelector('.js-close');

burgerButton.addEventListener('click', () => {
  closeButton.classList.add('active');
  document.body.classList.add("_lock")
  const tl = gsap.timeline();
  tl.to(menuSection, { left: '0%', duration: 0.2, ease: 'power2.inOut' })
    .to(closeButton, { rotation: 360, duration: 0.2, ease: 'power2.inOut' }, 0) 
    .fromTo('.menu__item', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.inOut' }, 0.2); 
});

closeButton.addEventListener('click', () => {
  document.body.classList.remove("_lock")
  closeButton.classList.remove('active');
  gsap.to(menuSection, { left: '-100%', duration: 0.5, ease: 'power2.inOut' });
  gsap.to(closeButton, { rotation: 0, duration: 0.5, ease: 'power2.inOut' });
});


function excessRow(cardsInRow) {
  const cards = Array.from(document.querySelector('.hero__list').children);
  const remainingCards = cards.length % cardsInRow;
  cards.forEach((c, index) => {
    c.classList.toggle('excess', index >= cards.length - remainingCards);
  });
}

function countCardsInRow() {
  const cardsList = document.querySelector('.hero__list');
  const card = cardsList.querySelector('li');
  const cardsInRow = Math.floor(cardsList.offsetWidth / card.getBoundingClientRect().width);
  excessRow(cardsInRow);
}

window.addEventListener('load', countCardsInRow);
window.addEventListener('resize', countCardsInRow);

