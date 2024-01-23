import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  values: document.querySelectorAll('.value'),
};
refs.startBtn.setAttribute('disabled', '');
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateChosen(selectedDates[0]);
  },
};
flatpickr(refs.datePicker, options);

const onDateChosen = date => {
  if (date.getTime() <= new Date().getTime()) {
    alert('Select date in the future!');
    return;
  }
  refs.startBtn.removeAttribute('disabled');
  refs.startBtn.addEventListener('click', () => onStartClick(date));
};

const onStartClick = date => {
  let milisec = date.getTime() - new Date().getTime();
  intervalId = setInterval(() => {
    countDown(milisec);
    milisec -= 1000;
  }, 1000);
};
const countDown = milisec => {
  if (milisec < 0) {
    clearInterval(intervalId);
    return;
  }
  refs.values.forEach(el => {
    const key = Object.keys(el.dataset)[0];
    el.textContent = setDoubleNum(convertMs(milisec)[key]);
  });
};
const setDoubleNum = num => {
  return num.toString().padStart(2, '0');
};
const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
