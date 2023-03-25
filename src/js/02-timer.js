import '../css/common.css';
import './countdown.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './add-timer-convertMs';

const refs = {
  inputDateTimePicker: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  daysData: document.querySelector('span[data-days]'),
  hoursData: document.querySelector('span[data-hours]'),
  minutesData: document.querySelector('span[data-minutes]'),
  secondsData: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let deltaTime = 0;
let formatDate = null;

refs.buttonStart.disabled = true;

refs.buttonStart.addEventListener(`click`, () => {
  timerId = setInterval(startCountdown, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectionStartDate(selectedDates[0]);
  },
};

flatpickr(refs.inputDateTimePicker, options);

function selectionStartDate(selectedDates) {
  const currentDays = Date.now();

  if (selectedDates < currentDays) {
    Notify.failure('Please Choose A Date In The Future');
    refs.buttonStart.disabled = true;
    return;
  }

  refs.buttonStart.disabled = false;

  deltaTime = selectedDates.getTime() - currentDays;
  formatDate = convertMs(deltaTime);
  updateInterfaceTimer(formatDate);
}

function startCountdown() {
  refs.buttonStart.disabled = true;
  refs.inputDateTimePicker.disabled = true;

  if (deltaTime <= 1000) {
    Notify.success('Time Is Up');
    refs.buttonStart.disabled = true;
    clearInterval(timerId);
  } else {
    deltaTime -= 1000;
    formatDate = convertMs(deltaTime);
    updateInterfaceTimer(deltaTime);
    styleCss();
  }
}

function updateInterfaceTimer() {
  refs.daysData.textContent = addLeadingZero(formatDate.days);
  refs.hoursData.textContent = addLeadingZero(formatDate.hours);
  refs.minutesData.textContent = addLeadingZero(formatDate.minutes);
  refs.secondsData.textContent = addLeadingZero(formatDate.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function styleCss() {
  document.body.style.backgroundColor = '#78787850';
}
