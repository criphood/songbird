const result = document.querySelector('.result'),
  scoreInner = document.querySelector('.score__inner-value'),
  descriptionScore = document.querySelector('.result__description-score'),
  playAgain = document.querySelector('.play__again'),
  score = localStorage.getItem('criphoodScore');

if (window.location.href.includes('result.html')) {
  scoreInner.innerHTML = descriptionScore.innerHTML = score;
  playAgain.addEventListener('click', () => {
    window.location.href = 'quiz.html';
  });

  if (score === 30) {
    playAgain.style.display = 'none';
  }
}




