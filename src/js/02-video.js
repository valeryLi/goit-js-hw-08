import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const throttle = require('lodash.throttle');

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);

  if (event.seconds === event.duration) {
    localStorage.removeItem('videoplayer-current-time');
  }
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
