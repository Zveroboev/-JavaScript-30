const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let mousedown = false;

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';

  video[method]();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleChangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = parseFloat((video.currentTime / video.duration) * 100);

  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(evt) {
  video.currentTime = (evt.offsetX / progress.offsetWidth) * video.duration;
  console.log(video.currentTime);

  handleProgress();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

document.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (evt) => mousedown && scrub(evt));

toggle.addEventListener('click', togglePlay);

Array.prototype.forEach.call(skipButtons, button => button.addEventListener('click', skip));
Array.prototype.forEach.call(ranges, range => {
  range.addEventListener('change', handleChangeUpdate);
  range.addEventListener('mousemove', handleChangeUpdate);
});
