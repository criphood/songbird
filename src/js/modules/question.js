import { birdsData } from './lang';
import { Player, renderPlayer } from './player';

let secretBirdData, currentCategory, player, categoryList;

if (window.location.href.includes('quiz.html')) {
  categoryList = document.querySelector('.category__list').children;

  askQuestion();

  player = new Player(secretBirdData.audio, document.querySelector('.question'));

  renderPlayer(player);
}

function askQuestion() {
  secretBirdData = setSecretBird(categoryList);
}

function setSecretBird(item) {
  const category = setCategory(item),
    birdNum = getRandomArbitrary(0, 5);

  return birdsData[category][birdNum];
}

function setCategory(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].matches('.active')) {
      currentCategory = i;
    }
  }
  return currentCategory;
}

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed();
}

export {
  secretBirdData, currentCategory, player, askQuestion
}


