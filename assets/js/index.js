import { g as gsapWithCSS } from "./vendor.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const burgerButton = document.querySelector(".js-burger");
const menuSection = document.querySelector(".js-menu");
const closeButton = document.querySelector(".js-close");
burgerButton.addEventListener("click", () => {
  closeButton.classList.add("active");
  document.body.classList.add("_lock");
  const tl = gsapWithCSS.timeline();
  tl.to(menuSection, { left: "0%", duration: 0.2, ease: "power2.inOut" }).to(closeButton, { rotation: 360, duration: 0.2, ease: "power2.inOut" }, 0).fromTo(".menu__item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.inOut" }, 0.2);
});
closeButton.addEventListener("click", () => {
  document.body.classList.remove("_lock");
  closeButton.classList.remove("active");
  gsapWithCSS.to(menuSection, { left: "-100%", duration: 0.5, ease: "power2.inOut" });
  gsapWithCSS.to(closeButton, { rotation: 0, duration: 0.5, ease: "power2.inOut" });
});
function excessRow(cardsInRow) {
  const cards = Array.from(document.querySelector(".hero__list").children);
  const remainingCards = cards.length % cardsInRow;
  cards.forEach((c, index) => {
    c.classList.toggle("excess", index >= cards.length - remainingCards);
  });
}
function countCardsInRow() {
  const cardsList = document.querySelector(".hero__list");
  const card = cardsList.querySelector("li");
  const cardsInRow = Math.floor(cardsList.offsetWidth / card.getBoundingClientRect().width);
  excessRow(cardsInRow);
}
window.addEventListener("load", countCardsInRow);
window.addEventListener("resize", countCardsInRow);
