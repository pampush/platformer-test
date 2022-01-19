// eslint-disable-next-line import/no-anonymous-default-export
export default (score) => {
  const scoreElement = document.getElementsByClassName("score-amount")[0];
  const currentScore = Number(scoreElement.innerText);

  scoreElement.innerText = currentScore + score;
};
