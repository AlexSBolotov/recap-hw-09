const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let intervalId;
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};
const onStartClick = e => {
  e.preventDefault;
  refs.start.setAttribute('disabled', '');
  refs.stop.addEventListener('click', onStopClick);
  refs.start.removeEventListener('click', onStartClick);
  intervalId = setInterval(changeColor, 1000);
};
const changeColor = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};
const onStopClick = e => {
  e.preventDefault;
  clearInterval(intervalId);
  refs.start.removeAttribute('disabled');
  refs.start.addEventListener('click', onStartClick);
  refs.stop.removeEventListener('click', onStopClick);
};
refs.start.addEventListener('click', onStartClick);
