import { birdsDataEn, birdsDataRu } from './data';

let location, birdsData, currentCategory, categoryList, answerOptions,
questionInnerName;

const locationChanger = document.querySelector('.location'),
  home = document.querySelector('.home'),
  quiz = document.querySelector('.quiz'),
  gallery = document.querySelector('.gallery__page'),
  wing = document.querySelector('.meeting__wrapper-wing');


if (window.location.href.includes('quiz.html')) {
  categoryList = document.querySelector('.category__list').children,
  answerOptions = document.querySelector('.answer__options').children,
  questionInnerName = document.querySelector('.question__inner-name');
}



if (localStorage.getItem('criphoodLocation')) {
  location = getLocation();
} else {
  location = 'en';
}

translate();

locationChanger.addEventListener('click', () => {
  getLocation();
  changeLocation();
  translate();
  window.location.reload();
});

function translate() {
  changeLangIcon();
  translateHome();
  translateQuiz();
  translateScore();
  translateData();
  translateResult();
}

function changeLangIcon() {
  if (location === 'en') {
    locationChanger.style.backgroundImage = 'url("../assets/icons/britain.jpg")';
  } else {
    locationChanger.style.backgroundImage = 'url("../assets/icons/russia.jpg")';
  }
}

function changeLocation() {
  const locations = ['en', 'ru'];

  location === locations[0] ? location = 'ru' : location = 'en';

  setLocation();
}

function getLocation() {
  return localStorage.getItem('criphoodLocation');
}

function setLocation() {
  localStorage.setItem('criphoodLocation', location);
}

// Home Page
function translateHome() {
  if (location === 'en') {
    home.textContent = 'Home';
    quiz.textContent = 'QUIZ';
    gallery.textContent = 'Gallery';
    if (window.location.href.includes('index.html')) {
      wing.innerHTML = '<b>I would like to <br>win the QUIZ!</b>';
    }
  } else {
    home.textContent = 'Домашняя страница';
    quiz.textContent = 'Викторина';
    gallery.textContent = 'Галерея';
    if (window.location.href.includes('index.html')) {
      wing.innerHTML = '<b>Хочу выиграть викторину!</b>';
    }
  }
}

// Quiz
function translateQuiz() {
  if (window.location.href.includes('quiz.html')) {
    const warm = document.querySelector('#warm__up'),
      passerine = document.querySelector('#passerine'),
      forest = document.querySelector('#forest__birds'),
      singers = document.querySelector('#song__birds'),
      predators = document.querySelector('#predator__birds'),
      sea = document.querySelector('#sea__birds'),
      next = document.querySelector('.next'),
      filler = document.querySelector('.answer__description-filler');

    if (location === 'en') {
      warm.textContent = 'Warm-UP';
      passerine.textContent = 'Passerine';
      forest.textContent = 'Forest Birds';
      singers.textContent = 'Song Birds';
      predators.textContent = 'Predator Birds';
      sea.textContent = 'Sea Birds';
      next.textContent = 'Next Level';
      filler.textContent = "Listen to the player. Choose the correct bird's voice."
    } else {
      warm.textContent = 'Разминка';
      passerine.textContent = 'Воробьиные';
      forest.textContent = 'Лесные птицы';
      singers.textContent = 'Певчие птицы';
      predators.textContent = 'Хищные птицы';
      sea.textContent = 'Морские птицы';
      next.textContent = 'Следующий уровень';
      filler.textContent = "Прослушайте плеер. Выберите правильный голос птицы."
    }
  }
}

// Score section
function translateScore() {
  if (window.location.href.includes('quiz.html') ||
    window.location.href.includes('result.html')) {
    const score = document.querySelector('.score__inner-text');

    location === 'en' ? score.textContent = 'Score: ' : score.textContent = 'Счет: '
  }
}

// Data
function translateData() {
  location === 'en' ? birdsData = birdsDataEn : birdsData = birdsDataRu;
}

// Result
function translateResult() {
  if (window.location.href.includes('result.html')) {
    const congrats = document.querySelector('.result__header'),
      again = document.querySelector('.play__again'),
      first = document.querySelector('.result__description-first'),
      last = document.querySelector('.result__description-last'),
      description = document.querySelector('.result__description'),
      score = localStorage.getItem('criphoodScore');


    if (location === 'en') {
      congrats.textContent = 'Congratulations!';
      again.textContent = 'Play again!';
      first.textContent = 'You passed the quiz with ';
      last.textContent = 'out of 30 points.';
      if (score === 30) {
        description.innerHTML = `
          You passed the quiz with 30 points and joined
          the club of young naturalists!
        `;
      }
    } else {
      congrats.textContent = 'Поздравляем!';
      again.textContent = 'Начать сначала!';
      first.textContent = 'Вы прошли викторину с результатом: ';
      last.textContent = 'очков из 30.';
      if (score === 30) {
        description.innerHTML = `
          Вы завершили викторину с максимальным количеством баллов! 
          Добро пожаловать в клуб юных натуралистов!
        `;
      }
    }
  }
}

export {
  location, locationChanger, changeLocation,
  getLocation, setLocation, birdsData, translate
}