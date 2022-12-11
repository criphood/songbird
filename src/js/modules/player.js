class Player {
  constructor(src, parent) {
    this.src = src;
    this.parent = parent;
    this.audio = new Audio(this.src);
    this.player = this.parent.querySelector('.player'),
      this.play = this.parent.querySelector('.play'),
      this.progressBar = this.parent.querySelector('.progress-bar'),
      this.volumeBar = this.parent.querySelector('.volume-bar'),
      this.currentTime = this.parent.querySelector('.current-time'),
      this.durationTime = this.parent.querySelector('.duration-time'),
      this.volumeIcon = this.parent.querySelector('.volume-icon');
    this.isPlay = false;
  }

  setEventListeners() {
    this.audio.addEventListener('ended', () => {
      this.playAudio();
      this.switchButton();
      this.audio.currentTime = 0;
      this.changeInputBackground(this.progressBar);
    })
    this.play.addEventListener('click', () => {
      this.playAudio();
      this.switchButton();
    });
    this.progressBar.addEventListener('change', () => {
      this.audio.currentTime = this.progressBar.value;
      this.changeInputBackground(this.progressBar);
      this.interval = setInterval(() => {
        this.updateProgressValue();
      }, 200);
    })

    this.progressBar.addEventListener('input', () => {
      this.currentTime.textContent = (this.formatTime(Math.floor(this.progressBar.value)))
      this.changeInputBackground(this.progressBar);
      clearInterval(this.interval);
    })

    this.volumeBar.addEventListener('input', () => {
      this.changeVolumeLevel();
      this.changeInputBackground(this.volumeBar);
      this.changeMuteIcon();
    })

    this.volumeBar.addEventListener('change', () => {
      this.changeVolumeLevel();
      this.changeInputBackground(this.volumeBar);
      this.changeMuteIcon();
    })
  }

  playAudio() {
    this.audio.currentTime = this.progressBar.value;
    if (!this.isPlay) {
      this.audio.play();
      this.isPlay = true;
    } else {
      this.audio.pause();
      this.isPlay = false;
    }
  }

  reset() {
    this.audio.pause();
    this.isPlay = false;
    this.audio.currentTime = 0;
    this.switchButton();
  }

  switchButton() {
    if (this.isPlay) {
      this.play.classList.add('pause');
    } else {
      this.play.classList.remove('pause');
    }
  }

  changeVolumeLevel() {
    this.audio.muted = false;
    this.audio.volume = this.volumeBar.value / 100;
  }

  changeMuteIcon() {
    if (this.volumeBar.value === '0') {
      this.volumeIcon.style.backgroundImage = 'url("../assets/icons/volume-mute.svg")';
    } else {
      this.volumeIcon.style.backgroundImage = 'url("../assets/icons/volume-level.svg")';
    }
  }

  updateProgressValue() {
    this.progressBar.max = this.audio.duration;
    this.progressBar.value = this.audio.currentTime;
    this.currentTime.textContent = (this.formatTime(Math.floor(this.audio.currentTime)));
    if (this.formatTime(Math.floor(this.audio.duration)) == 'NaN:NaN') {
      this.durationTime.innerHTML = '0:00';
    } else {
      this.durationTime.innerHTML = (this.formatTime(Math.floor(this.audio.duration)));
    }

    this.changeInputBackground(this.progressBar);
  }

  setUpdateInterval() {
    this.interval = setInterval(() => {
      this.updateProgressValue();
    }, 200);
  }

  formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
      sec = `0${sec}`;
    };
    return `${min}:${sec}`;
  }

  changeInputBackground(e) {
    const min = e.min,
      max = e.max,
      val = e.value;
    e.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  }
}

function renderPlayer(item) {
  item.setEventListeners();
  item.changeMuteIcon();
  item.switchButton();
  item.updateProgressValue();
  item.setUpdateInterval();
}

export { Player, renderPlayer }

