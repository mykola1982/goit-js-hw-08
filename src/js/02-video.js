import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './storage';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onTimeupdate = function (data) {
  save(CURRENT_TIME_KEY, data);
};

player.on('timeupdate', throttle(onTimeupdate, 1000));

const savedData = load(CURRENT_TIME_KEY);

if (savedData) {
  player
    .setCurrentTime(savedData.seconds)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
