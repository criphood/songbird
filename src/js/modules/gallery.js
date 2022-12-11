import { birdsData } from './lang';
import { Player, renderPlayer } from './player';
console.log(birdsData)

if (window.location.href.includes('gallery.html')) {
  const gallery = document.querySelector('.gallery'),
    variations = gallery.querySelectorAll('.variation');

  let players = [];

  variations.forEach((variation, i) => {
    birdsData.forEach((array, j) => {
      if (j !== 0) {
        variation.innerHTML = `
          <h2 class="variation__header">${birdsData[i + 1][0].kind}</h2>
          <div class="variation__inner"></div>
        `;

        array.forEach((bird, k) => {
          const item = birdsData[i + 1][k];
          const card = document.createElement('div');

          card.classList.add('gallery__description');
          card.innerHTML = `
            <div class="gallery__description-bird">
              <div class="description__title">
                <div class="picture"></div>
                <div class="information">
                  <h2 class="information__name">${item.name}</h2>
                  <hr>
                  <div class="information__species">${item.species}</div>
                  <hr>
                  <div class="player">
                    <div class="song">
                      <button class="play"></button>
                      <div class="bars">
                        <input type="range" class="progress-bar" min="0" step="0.1">
                        <div class="song-time">
                          <div class="current-time"></div>
                          <div class="duration-time"></div>
                        </div>
                      </div>
                    </div>
                    <div class="volume">
                      <div class="volume-icon"></div>
                      <input type="range" class="volume-bar" min="0" max="100" value="100">
                    </div>
                  </div>
                </div>
              </div>
              <div class="description__text">${item.description}</div>
            </div>
          `;

          const player = new Player(item.audio, card.querySelector('.gallery__description-bird'));
          players.push(player);
          renderPlayer(player);

          card.querySelector('.picture').style.backgroundImage = `url(${item.image})`;

          variations[i].children[1].append(card);
        });
      };
    });
  });

  const playButtons = gallery.querySelectorAll('.play');

  playButtons.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      players.forEach((player, j) => {
        if (player.parent !== e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          && player.audio.currentTime !== 0) {
          player.reset();
        }
      })
    });
  });

}


