import { birdsData, translate, locationChanger,
  getLocation, changeLocation } from './lang';
import { Player, renderPlayer } from './player';
import {
  secretBirdData, currentCategory,
  player, askQuestion
} from './question';

let categoryList, answer, options, filler, bird, playAnswer,
  text, picture, denotation, species, correct, wrong, question,
  playQuestion, next, optionPlayer;

const scoreInner = document.querySelector('.score__inner-value'),
  questionPicture = document.querySelector('.question__picture'),
  questionInner = document.querySelector('.question__inner-name');

let isStarted = false,
  isGuessed = false,
  counter = 0,
  score = 0;

if (window.location.href.includes('quiz.html')) {
  answer = document.querySelector('.answer'),
  options = answer.querySelector('.answer__options'),
  filler = answer.querySelector('.answer__description-filler'),
  bird = answer.querySelector('.answer__description-bird'),
  playAnswer = answer.querySelector('.play'),
  text = answer.querySelector('.description__text'),
  picture = answer.querySelector('.picture'),
  denotation = answer.querySelector('.information__name'),
  species = answer.querySelector('.information__species'),
  correct = answer.querySelector('#correct'),
  wrong = answer.querySelector('#wrong'),
  question = document.querySelector('.question'),
  playQuestion = question.querySelector('.play'),
  next = document.querySelector('.next'),
  categoryList = document.querySelector('.category__list').children,
  optionPlayer = new Player(secretBirdData.audio, document.querySelector('.answer'));

  wrong.volume = 0.4;
  correct.volume = 0.4;

  renderContent();
  renderPlayer(optionPlayer);

  playAnswer.addEventListener('click', () => {
    player.reset();
  });

  playQuestion.addEventListener('click', () => {
    optionPlayer.reset();
  });
}

function renderContent() {
  const category = birdsData[currentCategory];
  let pressedItems = [];

  resetAnswer();
  renderAnswer();

  category.forEach(item => {
    const li = document.createElement('li');

    li.classList.add('answer__options-item');
    li.innerHTML = `
      <span class="marker"></span>
      <span class="bird__name">${item.name}</span>
    `;
    options.append(li);

    li.addEventListener('click', () => {
      const { image, name, species, audio, description } = item;

      isStarted = true;
      optionPlayer.reset();
      optionPlayer.audio.src = audio;
      wrong.pause();
      wrong.currentTime = 0;

      if (!isGuessed) {
        if (pressedItems.indexOf(li) === -1) {
          counter++;
        }
        paintMarker(name, li.children[0]);

        if (name === secretBirdData.name) {
          correct.play();
          isGuessed = true;
          // questionInner.textContent = name;
          translateQuestion(questionInner, name);
          questionPicture.style.backgroundImage = `url(${image})`;
          setScoreValue();
          player.reset();
          next.classList.add('clickable');
          next.addEventListener('click', moveToNext);
        } else {
          wrong.play();
        }
      }
      renderAnswer(image, name, species);

      text.textContent = description;
      pressedItems.push(li);
    });
  });
}

// Question name
function translateQuestion(placement, text) {
  placement.textContent = text;
}

function resetAnswer() {
  options.innerHTML = '';
  isGuessed = false;
  isStarted = false;
  counter = 0;
}

function setScoreValue() {
  if (counter === 1) score += 5;
  if (counter === 2) score += 4;
  if (counter === 3) score += 3;
  if (counter === 4) score += 2;
  if (counter === 5) score += 1;
  scoreInner.textContent = score;
}

function renderAnswer(image, name, variety) {
  if (!isStarted) {
    bird.style.display = 'none';
    filler.style.display = 'block';
  } else {
    bird.style.display = 'flex';
    filler.style.display = 'none';
  }
  picture.style.backgroundImage = `url(${image})`;
  denotation.textContent = `${name}`;
  species.textContent = `${variety}`;
}

function paintMarker(item, marker) {
  if (item === secretBirdData.name) {
    marker.classList.remove('incorrect');
    marker.classList.add('correct');
  } else {
    marker.classList.remove('correct');
    marker.classList.add('incorrect');
  }
}

function moveToNext() {
  changeCategory();
  askQuestion();
  questionInner.textContent = '******';
  questionPicture.style.backgroundImage = "url('../assets/images/angry_birds_blue.jpg')";
  player.audio.src = secretBirdData.audio;
  player.updateProgressValue();
  renderContent();
  next.removeEventListener('click', moveToNext);
  next.classList.remove('clickable');
  player.reset();
  optionPlayer.reset();
}

function moveToResult() {
  next.removeEventListener('click', moveToNext);
  next.textContent = 'Show result!';
  localStorage.setItem('criphoodScore', score);
  window.location.href = 'result.html';
}

function changeCategory() {
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].matches('.active')) {
      if (i === categoryList.length - 1) {
        moveToResult();
      } else {
        categoryList[i].classList.remove('active');
        categoryList[i + 1].classList.add('active');
        break;
      }
    }
  }
}

export { renderContent }