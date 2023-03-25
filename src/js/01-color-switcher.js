const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  timerId = setInterval(colorsSwitching, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopBtn() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function colorsSwitching() {
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
