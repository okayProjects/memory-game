const cardsColor = ['red', 'red', 'green', 'green', 'blue', 'blue', 'yellow', 'yellow', 'orange', 'orange', 'purple', 'purple', 'greenyellow', 'greenyellow', 'lightsalmon', 'lightsalmon', 'brown', 'brown'];

const startButton = document.querySelector('.welcome button');
const welcomePage = document.querySelector('.welcome');
const gamePage = document.querySelector('.box-wrapper');
let cards = document.querySelectorAll('.box-wrapper>div');
cards = [...cards];
const startTime = new Date().getTime();
let activeCard = '';
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;
const congratulations = document.querySelector('.welcome p');
const score = document.querySelector('.welcome p:nth-child(2)');
const playButton = document.querySelector('.welcome button');

const startGame = () => {
    init();
    welcomePage.classList.add('visibility-off');
    gamePage.classList.remove('visibility-off');
}
startButton.addEventListener('click', startGame);


const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    activeCard.classList.remove('hidden');
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return
    } else {
        cards.forEach(card => card.removeEventListener('click', clickCard));
        activeCards[1] = activeCard;
        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add('off'));
                gameResult++;
                cards.filter((card) => !card.classList.contains('off'));
                if (gameResult == gamePairs) {
                    welcomePage.classList.remove('visibility-off');
                    gamePage.classList.add('visibility-off');
                    congratulations.textContent = 'Gratulacje, udało się!!!';
                    const endTime = new Date().getTime();
                    score.innerHTML = `Twój czas to ${((startTime - endTime) / 1000).toFixed(0)} s.`
                    playButton.textContent = 'Zagraj jeszcze raz';
                    playButton.addEventListener('click', () => {
                        location.reload();
                    })
                }
            } else {
                activeCards.forEach(card => card.classList.add('hidden'));
            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard));
        }, 400);
    }
}

const init = () => {
    cards.forEach(card => {
        const index = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[index]);
        cardsColor.splice(index, 1);
    });
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('hidden');
            card.addEventListener('click', clickCard);
        })
    }, 1500);
}



// init();